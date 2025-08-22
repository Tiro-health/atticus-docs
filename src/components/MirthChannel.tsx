export default function MirthChannel({
  name,
  href,
  description,
  version,
}: {
  name: string
  href?: string
  description?: string
  version?: string
}) {
  return (
    <a
      href={href}
      className="group flex w-fit cursor-pointer gap-2 rounded border border-double border-gray-200 p-2 hover:bg-gray-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="p-1">
        <Logo />
      </div>
      <div className="max-w-sm cursor-pointer select-none text-ellipsis text-left font-normal text-gray-700 no-underline">
        <h3 className="leading-1 m-0 text-base font-semibold no-underline">
          {name}{' '}
          {version && <span className="text-xs text-gray-500">v{version}</span>}
        </h3>
        {description && (
          <p className="leading-1 m-0 text-xs no-underline">{description}</p>
        )}
      </div>
      <div className="flex cursor-pointer items-center p-4 align-middle text-gray-500 group-hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </a>
  )
}

const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Orange gradient */}
      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FF8A50', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#CF5E32', stopOpacity: 1 }} />
      </linearGradient>

      {/* Shadow filter for depth */}
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="1"
          stdDeviation="1"
          floodColor="rgba(0,0,0,0.2)"
        />
      </filter>
    </defs>

    {/* Background square with orange gradient */}
    <rect
      x="0"
      y="0"
      width="32"
      height="32"
      rx="4"
      ry="4"
      fill="url(#orangeGradient)"
      filter="url(#shadow)"
    />

    {/* Mirth "M" letter */}
    <text
      x="16"
      y="22"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="18"
      fontWeight="bold"
      textAnchor="middle"
      fill="white"
    >
      M
    </text>
  </svg>
)
