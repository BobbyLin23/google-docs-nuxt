import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSizeExtension = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML(element) {
              return {
                fontSize: element.style.fontSize,
              }
            },
            renderHTML(attributes) {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize(fontSize) {
        return ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run()
        }
      },
      unsetFontSize() {
        return ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: null }).run()
        }
      },
    }
  },
})
