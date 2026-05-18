import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { join } from 'path'

const CONTENT_DIRS = [
  'content/blog',
  'content/projects',
]

const STATIC_FILES = [
  'content/index.md',
  'content/abu-profile.json'
]

export async function getKnowledgeBase() {
  let knowledge = []

  // Add static files
  for (const file of STATIC_FILES) {
    const filePath = join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      knowledge.push({
        source: file,
        content: content
      })
    }
  }

  // Add directory contents
  for (const dir of CONTENT_DIRS) {
    const dirPath = join(process.cwd(), dir)
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath)
      for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const filePath = join(dirPath, file)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { data, content } = matter(fileContent)
          knowledge.push({
            source: `${dir}/${file}`,
            title: data.title || file,
            category: data.category || '',
            tags: data.tags || [],
            content: content
          })
        }
      }
    }
  }

  return knowledge
}

/**
 * Searches Abu's technical blog articles and system design notes using keyword-based heuristics.
 * Ranks notes based on match frequencies in titles, categories, tags, and content.
 * Returns up to 5 safely truncated results with structured metadata.
 */
export async function searchSystemDesignAndAiNotes(query) {
  const knowledge = await getKnowledgeBase()
  const notes = knowledge.filter(k => k.source.startsWith('content/blog') || k.source.includes('blog'))
  
  if (!query || typeof query !== 'string') {
    return notes.slice(0, 5).map(n => ({
      title: n.title,
      category: n.category,
      tags: n.tags,
      source: n.source,
      excerpt: n.content.substring(0, 300) + '...',
      content: n.content.substring(0, 1200)
    }))
  }

  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2)
  if (terms.length === 0) {
    return notes.slice(0, 5).map(n => ({
      title: n.title,
      category: n.category,
      tags: n.tags,
      source: n.source,
      excerpt: n.content.substring(0, 300) + '...',
      content: n.content.substring(0, 1200)
    }))
  }

  // Score each note based on matching keywords
  const scored = notes.map(note => {
    let score = 0
    const titleLower = (note.title || '').toLowerCase()
    const catLower = (note.category || '').toLowerCase()
    const contentLower = (note.content || '').toLowerCase()
    const tagsLower = (note.tags || []).map(t => (typeof t === 'object' ? t.title || '' : t).toLowerCase())

    for (const term of terms) {
      if (titleLower.includes(term)) score += 10
      if (catLower.includes(term)) score += 5
      for (const t of tagsLower) {
        if (t.includes(term)) score += 3
      }
      if (contentLower.includes(term)) score += 1
    }

    return { note, score }
  })

  // Sort and filter scored notes
  let matched = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).map(s => s.note)

  if (matched.length === 0) {
    matched = notes.slice(0, 5)
  }

  return matched.slice(0, 5).map(n => ({
    title: n.title,
    category: n.category,
    tags: n.tags,
    source: n.source,
    excerpt: n.content.substring(0, 300) + '...',
    content: n.content.substring(0, 1200)
  }))
}

/**
 * Searches Abu's project portfolio case studies.
 * Ranks projects, returning relevant ones first, and falls back to all projects only for broad queries.
 */
export async function searchProjectPortfolio(query) {
  const knowledge = await getKnowledgeBase()
  const projects = knowledge.filter(k => k.source.startsWith('content/projects') || k.source.includes('projects'))

  if (!query || typeof query !== 'string') {
    return projects.map(p => ({
      title: p.title,
      category: p.category,
      tags: p.tags,
      source: p.source,
      excerpt: p.content.substring(0, 300) + '...',
      content: p.content.substring(0, 1500)
    }))
  }

  const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2)
  if (terms.length === 0) {
    return projects.map(p => ({
      title: p.title,
      category: p.category,
      tags: p.tags,
      source: p.source,
      excerpt: p.content.substring(0, 300) + '...',
      content: p.content.substring(0, 1500)
    }))
  }

  const scored = projects.map(proj => {
    let score = 0
    const titleLower = (proj.title || '').toLowerCase()
    const contentLower = (proj.content || '').toLowerCase()
    const tagsLower = (proj.tags || []).map(t => (typeof t === 'object' ? t.title || '' : t).toLowerCase())

    for (const term of terms) {
      if (titleLower.includes(term)) score += 10
      for (const t of tagsLower) {
        if (t.includes(term)) score += 3
      }
      if (contentLower.includes(term)) score += 1
    }

    return { proj, score }
  })

  // Filter scored projects
  const matched = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).map(s => s.proj)

  const results = matched.length > 0 ? matched : projects

  return results.map(p => ({
    title: p.title,
    category: p.category,
    tags: p.tags,
    source: p.source,
    excerpt: p.content.substring(0, 300) + '...',
    content: p.content.substring(0, 1500)
  }))
}

export function formatKnowledgeForPrompt(knowledge) {
  return knowledge.map(k => `
--- SOURCE: ${k.source} ---
TITLE: ${k.title || 'General Info'}
CONTENT:
${k.content.substring(0, 2000)}
`).join('\n')
}
