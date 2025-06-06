import { Marked } from "marked"
import { markedHighlight } from "marked-highlight"
import sanitizeHtml from "sanitize-html"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-markdown"

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "language-",
    langPrefix: "language-",
    highlight(code, lang) {
      if (lang && Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang)
      }
      return code
    },
  })
)

const sanitizeHtmlOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "h1",
    "h2",
    "span",
    "code",
    "pre",
    "div",
    "input",
    "label",
    "ul",
    "li",
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    div: ["class", "style"],
    code: ["class", "style"],
    pre: ["class", "style"],
    span: ["class", "style"],
    input: ["type", "id", "name", "class", "checked"],
    label: ["for", "class", "style"],
    ul: ["class", "style"],
    li: ["class", "style"],
  },
}

export function parseMarkdown(markdown: string): string {
  const content = markdown.replace(/\r\n/g, "\n")

  const sanitizedContent = sanitizeHtml(
    marked.parse(content, { async: false }),
    sanitizeHtmlOptions
  )
  return sanitizedContent
}
