<script setup lang="ts">
import type { Level } from '@tiptap/extension-heading'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const headings = [
  {
    label: 'Normal Text',
    value: 0,
    fontSize: '16px',
  },
  {
    label: 'Heading 1',
    value: 1,
    fontSize: '32px',
  },
  {
    label: 'Heading 2',
    value: 2,
    fontSize: '24px',
  },
  {
    label: 'Heading 3',
    value: 3,
    fontSize: '20px',
  },
  {
    label: 'Heading 4',
    value: 4,
    fontSize: '18px',
  },
  {
    label: 'Heading 5',
    value: 5,
    fontSize: '16px',
  },
]

const getCurrentHeading = computed(() => {
  for (let i = 0; i < headings.length; i++) {
    if (editor?.isActive('heading', { level: headings[i].value })) {
      return headings[i].label
    }
  }

  return headings[0].label
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="flex h-7 min-h-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-stone-200/80">
        <span>
          {{ getCurrentHeading }}
        </span>
        <ChevronDown class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="flex flex-col p-1 gap-y-1">
      <button
        v-for="({ value, label, fontSize }) in headings" :key="value"
        :class="cn('flex items-center gap-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
                   (value === 0 && !editor?.isActive('heading')) || (editor?.isActive('heading', {
                     level: value,
                   }) && 'bg-neutral-200/80'))"
        :style="{ fontSize }"
        @click="() => {
          if (value === 0) {
            editor?.chain().focus().setParagraph().run()
          }
          else {
            editor?.chain().focus().setHeading({ level: value as Level }).run()
          }
        }"
      >
        <span class="text-sm">
          {{ label }}
        </span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
