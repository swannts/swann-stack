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

export function formatKnowledgeForPrompt(knowledge) {
  return knowledge.map(k => `
--- SOURCE: ${k.source} ---
TITLE: ${k.title || 'General Info'}
CONTENT:
${k.content.substring(0, 2000)} // Truncate individual items if needed to stay within context
`).join('\n')
}
