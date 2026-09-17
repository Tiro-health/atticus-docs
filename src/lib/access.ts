/**
 * Client-side access gate helpers.
 *
 * The docs are a static export on GitHub Pages, so there is no server to check
 * a password against. Instead we ship a PBKDF2 verifier of the shared password
 * and derive the same value in the browser. This keeps the docs off the open
 * web and out of search results, but it is not a secret store: anyone with the
 * bundle can brute-force the verifier offline. Don't put credentials or
 * customer data in these pages.
 */

const ITERATIONS = 250_000
const KEY_LENGTH = 32

export const STORAGE_KEY = 'atticus-docs:access'
export const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000

export const salt =
  process.env.NEXT_PUBLIC_DOCS_ACCESS_SALT ?? 'tiro-health/atticus-docs'
export const verifier = process.env.NEXT_PUBLIC_DOCS_ACCESS_VERIFIER ?? ''

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

/** Derives the verifier for a password. Identical in the browser and in Node. */
export async function deriveVerifier(password: string) {
  let encoder = new TextEncoder()
  let key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password.normalize('NFKC').trim()),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  let bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    KEY_LENGTH * 8,
  )

  return toHex(bits)
}

/** Constant-time-ish comparison, so a wrong password leaks no timing signal. */
export function matchesVerifier(candidate: string) {
  if (candidate.length !== verifier.length) return false

  let mismatch = 0
  for (let i = 0; i < candidate.length; i++) {
    mismatch |= candidate.charCodeAt(i) ^ verifier.charCodeAt(i)
  }

  return mismatch === 0
}

export function readStoredGrant() {
  try {
    let stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    let grant = JSON.parse(stored) as { verifier?: string; grantedAt?: number }
    if (typeof grant.verifier !== 'string') return null
    if (typeof grant.grantedAt !== 'number') return null
    if (Date.now() - grant.grantedAt > MAX_AGE_MS) return null

    return grant.verifier
  } catch {
    return null
  }
}

export function storeGrant(candidate: string) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ verifier: candidate, grantedAt: Date.now() }),
    )
  } catch {
    // Private browsing or storage disabled: the visitor just signs in again.
  }
}

export function clearGrant() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to clean up.
  }
}
