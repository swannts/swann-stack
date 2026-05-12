import React from 'react'
import Button from '@/components/Button'
import Link from '@/components/Link'

const MDXButton = (props) => {
  const isInternalLink = props.href && (props.href.startsWith('/') || props.href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link {...props} passHref legacyBehavior>
        <Button {...props} />
      </Link>
    )
  }

  // Render external button links directly to avoid hydration mismatch caused by nested anchor tags
  const { passHref, legacyBehavior, ...restProps } = props
  return <Button {...restProps} />
}

export default MDXButton
