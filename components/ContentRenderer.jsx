import React from 'react'
import { MDXRemote } from 'next-mdx-remote'

import MDX from '@/components/MDX'

const ContentRenderer = (props) => {
  const { source } = props

  if (!source) return null

  const content = source.compiledSource ? source : source.content

  if (!content) return null

  return <MDXRemote {...content} components={MDX} />
}

export default ContentRenderer
