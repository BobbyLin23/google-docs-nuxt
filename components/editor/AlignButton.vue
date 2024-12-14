<script setup lang="ts">
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const alignments = [
  {
    label: 'Align Left',
    value: 'left',
    icon: AlignLeft,
  },
  {
    label: 'Align Center',
    value: 'center',
    icon: AlignCenter,
  },
  {
    label: 'Align Right',
    value: 'right',
    icon: AlignRight,
  },
  {
    label: 'Align Justify',
    value: 'justify',
    icon: AlignJustify,
  },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="flex h-7 min-w-7 flex-col items-center justify-center rounded-sm text-sm hover:bg-stone-200/80">
        <AlignLeft class="size-4 shrink-0" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1">
      <button
        v-for="({ label, value, icon }) in alignments"
        :key="value"
        :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-md hover:bg-neutral-200/80', {
          'bg-neutral-200/80': editor?.isActive('textAlign', value),
        })"
        @click="() => editor?.chain().focus().setTextAlign(value).run()"
      >
        <component :is="icon" class="size-4" />
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
