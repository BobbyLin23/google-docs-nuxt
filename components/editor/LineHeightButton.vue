<script setup lang="ts">
import { ListCollapse } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { useEditorStore } from '~/stores/editor'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const lineHeights = [
  {
    label: 'Default',
    value: 'normal',
  },
  {
    label: 'Single',
    value: '1',
  },
  {
    label: '1.15',
    value: '1.15',
  },
  {
    label: '1.5',
    value: '1.5',
  },
  {
    label: 'Double',
    value: '2',
  },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="flex h-7 min-w-7 flex-col items-center justify-center rounded-sm text-sm hover:bg-stone-200/80">
        <ListCollapse class="size-4 shrink-0" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1">
      <DropdownMenuItem
        v-for="({ label, value }) in lineHeights"
        :key="value"
        :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-md cursor-pointer', {
          'bg-neutral-200/80': editor?.getAttributes('paragraph').lineHeight === value,
        })"
        @click="() => editor?.chain().focus().setLineHeight(value).run()"
      >
        <span class="text-sm">{{ label }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
