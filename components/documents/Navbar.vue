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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '~/components/ui/menubar'

function handlePrint() {
  window.print()
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
                    <MenubarItem>
                      <FileJson class="size-4 mr-2" />
                      JSON
                    </MenubarItem>
                    <MenubarItem>
                      <Globe class="size-4 mr-2" />
                      HTML
                    </MenubarItem>
                    <MenubarItem>
                      <FileText class="size-4 mr-2" />
                      PDF
                    </MenubarItem>
                    <MenubarItem>
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
                <MenubarItem>
                  <Undo2 class="size-4 mr-2" />
                  Undo
                  <MenubarShortcut>
                    ⌘Z
                  </MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
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
                    <MenubarItem>
                      1 x 1
                    </MenubarItem>
                    <MenubarItem>
                      2 x 2
                    </MenubarItem>
                    <MenubarItem>
                      3 x 3
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
                    <MenubarItem>
                      <Bold class="size-4 mr-2" />
                      Bold
                      <MenubarShortcut>
                        ⌘B
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <Italic class="size-4 mr-2" />
                      Italic
                      <MenubarShortcut>
                        ⌘I
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <Underline class="size-4 mr-2" />
                      Underline
                      <MenubarShortcut>
                        ⌘U
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                      <Strikethrough class="size-4 mr-2" />
                      Strikethrough&nbsp;
                      <MenubarShortcut>
                        ⌘⇧X
                      </MenubarShortcut>
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarItem>
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
