type IconProps = { className?: string }

export function Leaf({ className = 'size-4 shrink-0' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 20c0-9 6-15 16-15 0 10-6 16-15 16a8 8 0 0 1-1-1Z" />
      <path d="M9 16c2-4 5-6 8-7" />
    </svg>
  )
}
