import yaml from 'js-yaml'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import computedFields from './computed-fields'

class Parser {
  constructor({ filePath, mdxOptions }) {
    this.filePath = filePath
    this.mdxOptions = mdxOptions
    this.computedFields = computedFields
    this.computedFieldKeys = Object.keys(computedFields)
    this.ignoreFields = ['compliedSource', 'filterBy', 'sortBy']
  }

  getSerializeOptions(options = {}) {
    return {
      ...options,
      mdxOptions: this.mdxOptions.options,
      // next-mdx-remote v6 blocks all JavaScript expressions by default.
      // This project uses trusted, repository-local MDX with component props
      // such as size={12}, so keep expressions enabled while preserving the
      // v6 default dangerous-JS guard.
      blockJS: false,
    }
  }

  async resolveComputedFields(data) {
    if (!data || Object.keys(data).length === 0) return null

    const self = this
    let results = Object.assign({}, data)

    async function traverse(fields, shallow) {
      if (!fields || typeof fields != 'object') return fields

      await Promise.all(
        Object.entries(fields).map(async ([key, value]) => {
          // Continue traverse if field is not a computed field
          if (!self.computedFieldKeys.includes(key)) {
            fields[key] = await traverse(value, shallow)
            return fields
          }

          // Resolve computed field
          const { resolve, hasSubFields } = self.computedFields[key]
          fields[key] = await resolve(value, {
            mdxOptions: self.mdxOptions,
            shallow,
          })

          // Resolve sub-fields within computed field
          if (hasSubFields) {
            // Shallow fields wont have their subFields traversed
            const { shallow } = fields[key]
            fields[key] = await traverse(fields[key], shallow)
          }

          return fields
        })
      )

      return fields
    }

    results = await traverse(results)

    return results
  }

  async parseFrontmatter(filePath) {
    const { data } = await matter.read(filePath)
    return data
  }

  async parseMdxSections(sections) {
    const result = {}

    if (!sections || sections.length < 1) {
      return result
    }

    await Promise.all(
      sections.map(async ({ key, data, content }) => {
        const serializedContent =
          content.replace(/[\n\r\t\s]+/g, '').length > 0
            ? await serialize(content, this.getSerializeOptions())
            : null

        //Check if section key represents array item eg. Section[1]
        var [, arrKey, arrIndex] = key.match(/(\w+)\[([0-9]+)\]$/) || []

        if (!arrIndex) {
          result[key] = data || {}
          result[key].content = serializedContent
          return
        }

        result[arrKey] = result[arrKey] || []
        result[arrKey][arrIndex] = data || {}
        result[arrKey][arrIndex].content = serializedContent
      })
    )

    return result
  }

  async parseMdx(filePath) {
    const { data, content, sections } = await matter.read(filePath, {
      section: (section, file) => {
        if (typeof section.data === 'string' && section.data.trim() !== '') {
          section.data = yaml.load(section.data)
        }
        section.content = section.content.trim()
      },
    })

    const serializedContent = await serialize(
      content,
      this.getSerializeOptions({
        scope: { path: '/blog' },
        parseFrontmatter: false,
      })
    )

    const serializedSections = await this.parseMdxSections(sections)

    return {
      data,
      content: serializedContent,
      sections: serializedSections,
    }
  }
}

export default Parser
