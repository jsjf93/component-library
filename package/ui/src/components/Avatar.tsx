import { forwardRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { User } from '@borderline/icons'

export type AvatarSize = 'sm' | 'md' | 'lg'

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  src?: string
  alt?: string
  initials?: string
  size?: AvatarSize
}

const SIZES: Record<AvatarSize, { container: string; text: string; icon: string }> = {
  sm: { container: 'size-8',  text: 'text-xs',  icon: 'size-4' },
  md: { container: 'size-10', text: 'text-sm',  icon: 'size-5' },
  lg: { container: 'size-12', text: 'text-base', icon: 'size-6' },
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt = '', initials, size = 'md', ...props }, ref) => {
    const [imgFailed, setImgFailed] = useState(false)
    const { container, text, icon } = SIZES[size]
    const showImage = src && !imgFailed

    return (
      <span
        {...props}
        ref={ref}
        className={[
          'inline-flex items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground select-none shrink-0',
          container,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="size-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : initials ? (
          <span className={['font-semibold leading-none', text].join(' ')}>
            {initials.slice(0, 2).toUpperCase()}
          </span>
        ) : (
          <User className={icon} />
        )}
      </span>
    )
  },
)

Avatar.displayName = 'Avatar'
