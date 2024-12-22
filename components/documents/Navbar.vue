<script setup lang="ts">
import {
  Bold,
  File,
  FileJson,
  FilePen,
  FilePlus,
  FileText,
  Globe,
  Italic,
  Printer,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Text,
  Trash,
  Underline,
  Undo2,
} from 'lucide-vue-next'
import { useEditorStore } from '~/stores/editor'

function handlePrint() {
  window.print()
}

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

function insertTable({ rows, cols }: { rows: number, cols: number }) {
  editor.value?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
}

function handleDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function handleSaveJSON() {
  if (!editor.value)
    return

  const content = editor.value.getJSON()
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
  handleDownload(blob, 'document.json')
}

function handleSaveHTML() {
  if (!editor.value)
    return

  const content = editor.value.getHTML()
  const blob = new Blob([content], { type: 'text/html' })
  handleDownload(blob, 'document.html')
}

function handleSaveText() {
  if (!editor.value)
    return

  const content = editor.value.getText()
  const blob = new Blob([content], { type: 'text/plain' })
  handleDownload(blob, 'document.txt')
}

function handleSavePDF() {
  if (!editor.value)
    return

  const content = editor.value.getHTML()
  const blob = new Blob([content], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  document.body.appendChild(iframe)
  iframe.contentWindow?.print()
  document.body.removeChild(iframe)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <nav class="flex items-center justify-between">
    <div class="flex gap-2 items-center">
      <NuxtLink to="/">
        <NuxtImg src="/logo.svg" alt="logo" width="36" height="36" />
      </NuxtLink>
      <div class="flex flex-col">
        <DocumentInput />
        <div class="flex">
          <Menubar class="border-none bg-transparent shadow-none h-auto p-0">
            <MenubarMenu>
              <MenubarTrigger class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                File
              </MenubarTrigger>
              <MenubarContent class="print:hidden">
                <MenubarSub>
                  <MenubarSubTrigger>
                    <File class="size-4 mr-2" />
                    Save
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem @click="handleSaveJSON">
                      <FileJson class="size-4 mr-2" />
                      JSON
                    </MenubarItem>
                    <MenubarItem @click="handleSaveHTML">
                      <Globe class="size-4 mr-2" />
                      HTML
                    </MenubarItem>
                    <MenubarItem @click="handleSavePDF">
                      <FileText class="size-4 mr-2" />
                      PDF
                    </MenubarItem>
                    <MenubarItem @click="handleSaveText">
                      <FileText class="size-4 mr-2" />
                      Text
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem>
                  <FilePlus class="size-4 mr-2" />
                  New Document
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <FilePen class="size-4 mr-2" />
                  Rename
                </MenubarItem>
                <MenubarItem>
                  <Trash class="size-4 mr-2" />
                  Remove
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem @click="handlePrint">
                  <Printer class="size-4 mr-2" />
                  Print
                  <MenubarShortcut>
                    ⌘P
                  </MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Edit
              </MenubarTrigger>
              <MenubarContent class="print:hidden">
                <MenubarItem @click="() => editor?.chain().focus().undo().run()">
                  <Undo2 class="size-4 mr-2" />
                  Undo
                  <MenubarShortcut>
                    ⌘Z
                  </MenubarShortcut>
                </MenubarItem>
                <MenubarItem @click="() => editor?.chain().focus().redo().run()">
                  <Redo2 class="size-4 mr-2" />
                  Redo
                  <MenubarShortcut>
                    ⌘⇧Z
                  </MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Insert
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    Table
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem @click="() => insertTable({ rows: 1, cols: 1 })">
                      1 x 1
                    </MenubarItem>
                    <MenubarItem @click="() => insertTable({ rows: 2, cols: 2 })">
                      2 x 2
                    </MenubarItem>
                    <MenubarItem @click="() => insertTable({ rows: 3, cols: 3 })">
                      3 x 3
                    </MenubarItem>
                    <MenubarItem @click="() => insertTable({ rows: 4, cols: 4 })">
                      4 x 4
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                Format
              </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>
                    <Text class="size-4 mr-2" />
                    Text
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem @click="() => editor?.chain().focus().toggleBold().run()">
                      <Bold class="size-4 mr-2" />
                      Bold
                      <MenubarShortcut>
                        ⌘B
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem @click="() => editor?.chain().focus().toggleItalic().run()">
                      <Italic class="size-4 mr-2" />
                      Italic
                      <MenubarShortcut>
                        ⌘I
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem @click="() => editor?.chain().focus().toggleUnderline().run()">
                      <Underline class="size-4 mr-2" />
                      Underline
                      <MenubarShortcut>
                        ⌘U
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem @click="() => editor?.chain().focus().toggleStrike().run()">
                      <Strikethrough class="size-4 mr-2" />
                      Strikethrough&nbsp;
                      <MenubarShortcut>
                        ⌘⇧X
                      </MenubarShortcut>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem @click="() => editor?.chain().focus().unsetAllMarks().run()">
                  <RemoveFormatting class="size-4 mr-2" />
                  Clear formatting
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  </nav>
</template>
