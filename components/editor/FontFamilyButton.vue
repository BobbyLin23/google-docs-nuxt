<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { useEditorStore } from '~/stores/editor'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const fonts = [
  {
    label: 'Arial',
    value: 'Arial',
  },
  {
    label: 'Times New Roman',
    value: 'Times New Roman',
  },
  {
    label: 'Courier New',
    value: 'Courier New',
  },
  {
    label: 'Georgia',
    value: 'Georgia',
  },
  {
    label: 'Verdana',
    value: 'Verdana',
  },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="h-7 w-[120px] flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
        <span class="truncate">
          {{ editor?.getAttributes('textStyle').fontFamily || 'Arial' }}
        </span>
        <ChevronDown class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="({ label, value }) in fonts"
        :key="value"
        :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80', editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80')"
        :style="{
          fontFamily: value,
        }"
        @click="editor?.chain().focus().setFontFamily(value).run()"
      >
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
