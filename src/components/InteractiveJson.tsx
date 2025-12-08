'use client'

import { Fragment, ReactNode } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'
import { ChevronIcon } from '@/components/icons/ChevronIcon'

// Type definitions
export type HighlightRule = {
  path: string | RegExp
  className: string
  /** Optional pattern to highlight only matching part of string values */
  valuePattern?: RegExp
}

export type TooltipRule = {
  path: string | RegExp
  title: string
  content: ReactNode
  learnMoreUrl?: string
}

export type CollapsibleRule = {
  path: string | RegExp
  defaultOpen?: boolean
}

export type CollapsibleConfig = CollapsibleRule[]

export type InteractiveJsonProps = {
  data: unknown
  highlights?: HighlightRule[]
  tooltips?: TooltipRule[]
  collapsible?: CollapsibleConfig
  className?: string
}

// Path matching utilities
function matchPath(currentPath: string, rule: string | RegExp): boolean {
  if (typeof rule === 'string') {
    return currentPath === rule || currentPath.endsWith(rule)
  }
  return rule.test(currentPath)
}

function getHighlightRule(
  path: string,
  highlights: HighlightRule[],
): HighlightRule | undefined {
  return highlights.find((h) => matchPath(path, h.path))
}

function getTooltip(
  path: string,
  tooltips: TooltipRule[],
): TooltipRule | undefined {
  return tooltips.find((t) => matchPath(path, t.path))
}

function getCollapsibleRule(
  path: string,
  config?: CollapsibleConfig,
): CollapsibleRule | undefined {
  if (!config) return undefined
  return config.find((rule) => matchPath(path, rule.path))
}

// Info icon component
function InfoIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

// Tooltip component
function FieldTooltip({ tooltip }: { tooltip: TooltipRule }) {
  return (
    <Popover className="relative inline-block">
      <PopoverButton className="ml-1 inline-flex items-center focus:outline-none">
        <InfoIcon className="h-3 w-3 fill-zinc-400/50 stroke-zinc-950 transition-colors hover:fill-blue-500 dark:fill-zinc-600/50 dark:stroke-zinc-300 dark:hover:fill-blue-400" />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom start"
        className="z-50 mt-2 w-72 rounded-lg border border-blue-500/20 bg-white p-3 shadow-lg dark:border-blue-500/30 dark:bg-zinc-900"
      >
        <div className="text-sm">
          <p className="font-semibold text-zinc-900 dark:text-white">
            {tooltip.title}
          </p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            {tooltip.content}
          </p>
          {tooltip.learnMoreUrl && (
            <a
              href={tooltip.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Learn more →
            </a>
          )}
        </div>
      </PopoverPanel>
    </Popover>
  )
}

// JSON rendering components
function JsonKey({
  name,
  path,
  highlights,
  tooltips,
}: {
  name: string
  path: string
  highlights: HighlightRule[]
  tooltips: TooltipRule[]
}) {
  const tooltip = getTooltip(path, tooltips)
  return (
    <span className="inline-flex items-center">
      <span className="text-zinc-500 dark:text-zinc-400">
        &quot;{name}&quot;
      </span>
      {tooltip && <FieldTooltip tooltip={tooltip} />}
      <span className="text-zinc-400 dark:text-zinc-600">: </span>
    </span>
  )
}

function JsonString({
  value,
  path,
  highlights,
}: {
  value: string
  path: string
  highlights: HighlightRule[]
}) {
  const rule = getHighlightRule(path, highlights)

  // If there's a valuePattern, highlight all matching parts
  if (rule?.valuePattern) {
    const pattern = new RegExp(rule.valuePattern.source, 'g')
    const parts: Array<{ text: string; highlighted: boolean }> = []
    let lastIndex = 0
    let match

    while ((match = pattern.exec(value)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          text: value.slice(lastIndex, match.index),
          highlighted: false,
        })
      }
      parts.push({ text: match[0], highlighted: true })
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < value.length) {
      parts.push({ text: value.slice(lastIndex), highlighted: false })
    }

    if (parts.some((p) => p.highlighted)) {
      return (
        <span className="text-green-500 dark:text-green-500">
          &quot;
          {parts.map((part, i) =>
            part.highlighted ? (
              <span key={i} className={rule.className}>
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
          &quot;
        </span>
      )
    }
  }

  return (
    <span
      className={clsx(rule?.className || 'text-green-600 dark:text-green-400')}
    >
      &quot;{value}&quot;
    </span>
  )
}

function JsonNumber({
  value,
  path,
  highlights,
}: {
  value: number
  path: string
  highlights: HighlightRule[]
}) {
  const rule = getHighlightRule(path, highlights)
  return (
    <span
      className={clsx(
        rule?.className || 'text-orange-500 dark:text-orange-400',
      )}
    >
      {value}
    </span>
  )
}

function JsonBoolean({
  value,
  path,
  highlights,
}: {
  value: boolean
  path: string
  highlights: HighlightRule[]
}) {
  const rule = getHighlightRule(path, highlights)
  return (
    <span
      className={clsx(
        rule?.className || 'text-purple-500 dark:text-purple-400',
      )}
    >
      {value ? 'true' : 'false'}
    </span>
  )
}

function JsonNull() {
  return <span className="text-zinc-500">null</span>
}

function JsonValue({
  value,
  path,
  depth,
  highlights,
  tooltips,
  collapsible,
  isLast,
}: {
  value: unknown
  path: string
  depth: number
  highlights: HighlightRule[]
  tooltips: TooltipRule[]
  collapsible?: CollapsibleConfig
  isLast: boolean
}) {
  const comma = isLast ? '' : ','

  if (value === null) {
    return (
      <>
        <JsonNull />
        {comma}
      </>
    )
  }

  if (typeof value === 'string') {
    return (
      <>
        <JsonString value={value} path={path} highlights={highlights} />
        {comma}
      </>
    )
  }

  if (typeof value === 'number') {
    return (
      <>
        <JsonNumber value={value} path={path} highlights={highlights} />
        {comma}
      </>
    )
  }

  if (typeof value === 'boolean') {
    return (
      <>
        <JsonBoolean value={value} path={path} highlights={highlights} />
        {comma}
      </>
    )
  }

  if (Array.isArray(value)) {
    return (
      <JsonArray
        array={value}
        path={path}
        depth={depth}
        highlights={highlights}
        tooltips={tooltips}
        collapsible={collapsible}
        isLast={isLast}
      />
    )
  }

  if (typeof value === 'object') {
    return (
      <JsonObject
        obj={value as Record<string, unknown>}
        path={path}
        depth={depth}
        highlights={highlights}
        tooltips={tooltips}
        collapsible={collapsible}
        isLast={isLast}
      />
    )
  }

  return null
}

function JsonArray({
  array,
  path,
  depth,
  highlights,
  tooltips,
  collapsible,
  isLast,
}: {
  array: unknown[]
  path: string
  depth: number
  highlights: HighlightRule[]
  tooltips: TooltipRule[]
  collapsible?: CollapsibleConfig
  isLast: boolean
}) {
  const indent = '  '.repeat(depth)
  const innerIndent = '  '.repeat(depth + 1)
  const comma = isLast ? '' : ','
  const collapsibleRule = getCollapsibleRule(path, collapsible)

  if (array.length === 0) {
    return <span className="text-zinc-400 dark:text-zinc-600">[]{comma}</span>
  }

  const content = (
    <>
      {array.map((item, index) => (
        <div key={index}>
          <span className="text-zinc-400 dark:text-zinc-600">
            {innerIndent}
          </span>
          <JsonValue
            value={item}
            path={`${path}[${index}]`}
            depth={depth + 1}
            highlights={highlights}
            tooltips={tooltips}
            collapsible={collapsible}
            isLast={index === array.length - 1}
          />
        </div>
      ))}
      <span className="text-zinc-400 dark:text-zinc-600">
        {indent}]{comma}
      </span>
    </>
  )

  if (collapsibleRule) {
    return (
      <Disclosure defaultOpen={collapsibleRule.defaultOpen ?? true}>
        {({ open }) => (
          <>
            <DisclosureButton className="inline-flex items-center text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              <ChevronIcon
                className={clsx(
                  'h-3 w-3 transition-transform duration-200',
                  open && 'rotate-90',
                )}
              />
              <span className="ml-1 text-zinc-400 dark:text-zinc-600">[</span>
              {!open && (
                <span className="mx-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {array.length} items
                </span>
              )}
            </DisclosureButton>
            {open ? (
              <DisclosurePanel static>
                {array.map((item, index) => (
                  <div key={index}>
                    <span className="text-zinc-400 dark:text-zinc-600">
                      {innerIndent}
                    </span>
                    <JsonValue
                      value={item}
                      path={`${path}[${index}]`}
                      depth={depth + 1}
                      highlights={highlights}
                      tooltips={tooltips}
                      collapsible={collapsible}
                      isLast={index === array.length - 1}
                    />
                  </div>
                ))}
                <span className="text-zinc-400 dark:text-zinc-600">
                  {indent}]{comma}
                </span>
              </DisclosurePanel>
            ) : (
              <span className="text-zinc-400 dark:text-zinc-600">]{comma}</span>
            )}
          </>
        )}
      </Disclosure>
    )
  }

  return (
    <>
      <span className="text-zinc-400 dark:text-zinc-600">[</span>
      {content}
    </>
  )
}

function JsonObject({
  obj,
  path,
  depth,
  highlights,
  tooltips,
  collapsible,
  isLast,
}: {
  obj: Record<string, unknown>
  path: string
  depth: number
  highlights: HighlightRule[]
  tooltips: TooltipRule[]
  collapsible?: CollapsibleConfig
  isLast: boolean
}) {
  // Check for inline __collapsed field
  const hasInlineCollapsed =
    '__collapsed' in obj && typeof obj['__collapsed'] === 'boolean'
  const inlineCollapsedValue = hasInlineCollapsed
    ? (obj['__collapsed'] as boolean)
    : undefined
  // Filter out __collapsed from rendered entries
  const entries = Object.entries(obj).filter(([key]) => key !== '__collapsed')
  const indent = '  '.repeat(depth)
  const innerIndent = '  '.repeat(depth + 1)
  const comma = isLast ? '' : ','
  const collapsibleRule = getCollapsibleRule(path, collapsible)

  if (entries.length === 0) {
    return (
      <span className="text-zinc-400 dark:text-zinc-600">
        {'{}'}
        {comma}
      </span>
    )
  }

  const content = (
    <>
      {entries.map(([key, value], index) => {
        const keyPath = path ? `${path}.${key}` : key
        return (
          <div key={key}>
            <span className="text-zinc-400 dark:text-zinc-600">
              {innerIndent}
            </span>
            <JsonKey
              name={key}
              path={keyPath}
              highlights={highlights}
              tooltips={tooltips}
            />
            <JsonValue
              value={value}
              path={keyPath}
              depth={depth + 1}
              highlights={highlights}
              tooltips={tooltips}
              collapsible={collapsible}
              isLast={index === entries.length - 1}
            />
          </div>
        )
      })}
      <span className="text-zinc-400 dark:text-zinc-600">
        {indent}
        {'}'}
        {comma}
      </span>
    </>
  )

  // Collapsible if has inline __collapsed or matches external config
  const isCollapsible = (hasInlineCollapsed || collapsibleRule) && depth > 0
  // Inline __collapsed takes precedence over external config
  const defaultOpen = hasInlineCollapsed
    ? !inlineCollapsedValue
    : collapsibleRule?.defaultOpen ?? true

  if (isCollapsible) {
    return (
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <DisclosureButton className="inline-flex items-center text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
              <ChevronIcon
                className={clsx(
                  'h-3 w-3 transition-transform duration-200',
                  open && 'rotate-90',
                )}
              />
              <span className="ml-1 text-zinc-400 dark:text-zinc-600">
                {'{'}
              </span>
              {!open && (
                <span className="mx-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {entries.length} fields
                </span>
              )}
            </DisclosureButton>
            {open ? (
              <DisclosurePanel static>
                {entries.map(([key, value], index) => {
                  const keyPath = path ? `${path}.${key}` : key
                  return (
                    <div key={key}>
                      <span className="text-zinc-400 dark:text-zinc-600">
                        {innerIndent}
                      </span>
                      <JsonKey
                        name={key}
                        path={keyPath}
                        highlights={highlights}
                        tooltips={tooltips}
                      />
                      <JsonValue
                        value={value}
                        path={keyPath}
                        depth={depth + 1}
                        highlights={highlights}
                        tooltips={tooltips}
                        collapsible={collapsible}
                        isLast={index === entries.length - 1}
                      />
                    </div>
                  )
                })}
                <span className="text-zinc-400 dark:text-zinc-600">
                  {indent}
                  {'}'}
                  {comma}
                </span>
              </DisclosurePanel>
            ) : (
              <span className="text-zinc-400 dark:text-zinc-600">
                {'}'}
                {comma}
              </span>
            )}
          </>
        )}
      </Disclosure>
    )
  }

  return (
    <>
      <span className="text-zinc-400 dark:text-zinc-600">{'{'}</span>
      {content}
    </>
  )
}

// Main component
export function InteractiveJson({
  data,
  highlights = [],
  tooltips = [],
  collapsible,
  className,
}: InteractiveJsonProps) {
  return (
    <pre
      className={clsx(
        'overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm leading-relaxed',
        className,
      )}
    >
      <code className="font-mono">
        <JsonValue
          value={data}
          path=""
          depth={0}
          highlights={highlights}
          tooltips={tooltips}
          collapsible={collapsible}
          isLast={true}
        />
      </code>
    </pre>
  )
}
