#!/usr/bin/env node
/**
 * Computes the access verifier for a docs password.
 *
 *   node scripts/docs-password.mjs '<new password>'
 *
 * Put the printed value in NEXT_PUBLIC_DOCS_ACCESS_VERIFIER (see .env) and
 * deploy. Everyone's saved session is invalidated as soon as the verifier
 * changes, so they will be asked for the new password.
 */
import { webcrypto } from 'node:crypto'

const ITERATIONS = 250_000
const KEY_LENGTH = 32

const password = process.argv[2]
const salt =
  process.env.NEXT_PUBLIC_DOCS_ACCESS_SALT ?? 'tiro-health/atticus-docs'

if (!password) {
  console.error("Usage: node scripts/docs-password.mjs '<new password>'")
  process.exit(1)
}

const encoder = new TextEncoder()
const key = await webcrypto.subtle.importKey(
  'raw',
  encoder.encode(password.normalize('NFKC').trim()),
  'PBKDF2',
  false,
  ['deriveBits'],
)
const bits = await webcrypto.subtle.deriveBits(
  {
    name: 'PBKDF2',
    salt: encoder.encode(salt),
    iterations: ITERATIONS,
    hash: 'SHA-256',
  },
  key,
  KEY_LENGTH * 8,
)

const verifier = Buffer.from(bits).toString('hex')

console.log(`NEXT_PUBLIC_DOCS_ACCESS_VERIFIER=${verifier}`)
