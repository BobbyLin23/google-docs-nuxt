import type { Editor } from '@tiptap/vue-3'

export const useEditorStore = defineStore('editor', () => {
  const editor = ref<Editor | null>(null)

  const setEditor = (value: Editor | null) => {
    editor.value = value
  }
  return {
    editor,
    setEditor,
  }
})
