type IconProps = { className?: string }

export function Wallet({ className = 'size-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M16 12h.01" strokeWidth="2.5" />
      <path d="M2 10h20" />
    </svg>
  )
}
