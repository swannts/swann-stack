import classNames from 'clsx'
import React from 'react'
import LoadingDots from '@/components/LoadingDots'

const Button = React.forwardRef((props, ref) => {
  const {
    variant = 'white',
    size = 'md',
    disabled = false,
    className,
    as = 'a',
    children,
    ...rest
  } = props

  const Component = as

  return (
    <Component
      ref={ref}
      className={classNames(
        'relative inline-flex items-center justify-center',
        'leading-normal no-underline',
        'group cursor-pointer select-none focus:outline-none',
        disabled && 'pointer-events-none grayscale',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      <div
        className={classNames(
          'z-10 h-full w-full border-4 border-transparent group-active:border-alpha',
          'flex transform-gpu transition-transform',
          'not-prose font-mono',
          {
            'px-4 py-2 text-sm': size === 'xs',
            'px-6 py-3 text-sm': size === 'sm',
            'px-8 py-4 text-base': size === 'md',
            'px-10 py-5 text-lg': size === 'lg',
            'px-12 py-6 text-xl': size === 'xl',
            'hover:translate-x-1 hover:translate-y-1': size === 'xs',
            'hover:translate-x-2 hover:translate-y-2': size !== 'xs',
            'bg-white text-black hover:bg-omega-100': variant === 'white',
            'bg-black text-white hover:bg-omega-900': variant === 'black',
            'bg-omega-800 text-omega-100 hover:bg-omega-750 hover:text-white': variant === 'secondary',
            'bg-omega-900 text-omega-300 hover:bg-omega-800 hover:text-white': variant === 'ghost',
          }
        )}
      >
        <span className={classNames('mx-auto', { invisible: disabled })}>{children}</span>
        {disabled && <LoadingDots className="absolute left-0 top-0 h-full w-full" />}
      </div>
      <div
        className={classNames(
          'absolute h-full w-full',
          'bg-gradient-to-r from-alpha via-alpha-300 to-beta',
          {
            'left-1 top-1': size === 'xs',
            'left-2 top-2': size !== 'xs',
          }
        )}
      />
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
