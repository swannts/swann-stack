import React from 'react'
import NextLink from 'next/link'

const Link = ({ href, children, ...props }) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    )
  }

  // Strip Next.js specific wrapper props when rendering a native external anchor tag
  const { passHref, legacyBehavior, ...restProps } = props

  return (
    <a href={href} {...restProps}>
      {children}
    </a>
  )
}

export default Link
