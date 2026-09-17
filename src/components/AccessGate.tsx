'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { Logo } from '@/components/Logo'
import {
  clearGrant,
  deriveVerifier,
  matchesVerifier,
  readStoredGrant,
  storeGrant,
  verifier,
} from '@/lib/access'

type Status = 'checking' | 'locked' | 'unlocked' | 'unconfigured'

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full w-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <Logo className="h-8 dark:[&_path]:fill-white" />
        {children}
      </div>
    </div>
  )
}

export function AccessGate({ children }: { children: React.ReactNode }) {
  let [status, setStatus] = useState<Status>('checking')
  let [password, setPassword] = useState('')
  let [error, setError] = useState<string | null>(null)
  let [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!verifier) {
      if (process.env.NODE_ENV === 'production') {
        setStatus('unconfigured')
      } else {
        console.warn(
          'NEXT_PUBLIC_DOCS_ACCESS_VERIFIER is not set, serving the docs unprotected.',
        )
        setStatus('unlocked')
      }
      return
    }

    let stored = readStoredGrant()
    if (stored && matchesVerifier(stored)) {
      setStatus('unlocked')
    } else {
      clearGrant()
      setStatus('locked')
    }
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      let candidate = await deriveVerifier(password)
      if (matchesVerifier(candidate)) {
        storeGrant(candidate)
        setPassword('')
        setStatus('unlocked')
      } else {
        setError('That password is not correct.')
      }
    } catch {
      setError('Your browser could not check the password.')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'unlocked') {
    return <>{children}</>
  }

  if (status === 'checking') {
    // Rendered during the static export and the first client paint, so the
    // documentation never flashes before the gate has made up its mind.
    return <Shell>{null}</Shell>
  }

  if (status === 'unconfigured') {
    return (
      <Shell>
        <h1 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
          Access is not configured
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          This build has no access verifier, so the documentation stays locked.
          Set <code>NEXT_PUBLIC_DOCS_ACCESS_VERIFIER</code> and deploy again.
        </p>
      </Shell>
    )
  }

  return (
    <Shell>
      <h1 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
        Tiro.health Integration Docs
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        These docs are shared with integration partners. Enter the access
        password to continue, or ask your contact at Tiro.health for one.
      </p>
      <form onSubmit={onSubmit} className="mt-6">
        <label
          htmlFor="docs-access-password"
          className="text-sm font-medium text-zinc-900 dark:text-white"
        >
          Password
        </label>
        <input
          id="docs-access-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 block w-full rounded-lg border border-zinc-900/10 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        {error ? (
          <p role="alert" className="mt-2 text-sm text-red-500">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className={clsx(
            'mt-4 w-full rounded-full bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-700',
            'dark:bg-blue-500 dark:hover:bg-blue-400',
            submitting && 'opacity-60',
          )}
        >
          {submitting ? 'Checking…' : 'Continue'}
        </button>
      </form>
    </Shell>
  )
}
