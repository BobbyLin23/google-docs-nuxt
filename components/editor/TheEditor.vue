<script setup lang="ts">
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { StarterKit } from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import ImageResize from 'tiptap-extension-resize-image'
import { useEditorStore } from '~/store/editor'

const editor = ref<Editor>()
const { setEditor } = useEditorStore()

onMounted(() => {
  editor.value = new Editor({
    onCreate({ editor }) {
      setEditor(editor as Editor)
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate({ editor }) {
      setEditor(editor as Editor)
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor as Editor)
    },
    onTransaction({ editor }) {
      setEditor(editor as Editor)
    },
    onFocus({ editor }) {
      setEditor(editor as Editor)
    },
    onBlur({ editor }) {
      setEditor(editor as Editor)
    },
    onContentError({ editor }) {
      setEditor(editor as Editor)
    },
    editorProps: {
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px',
        class: 'focus:outline-none print:border-0 bg-white flex flex-col border-[#C7C7C7] min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
    content: 'Hello, World!',
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
    ],
  })
})

onUnmounted(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
    <div class="min-w-max flex justify-center py-4 print:py-0 print:w-full mx-auto print:min-w-0">
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>
