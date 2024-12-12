<script setup lang="ts">
import { type LucideIcon, Undo2 } from 'lucide-vue-next'
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const sections: {
  label: string
  icon: LucideIcon
  onClick: () => void
  isActive?: boolean
}[][] = [
  [
    {
      label: 'Undo',
      icon: Undo2,
      onClick: () => editor?.chain().focus().undo().run(),
    },
  ],
]
</script>

<template>
  <div class="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
    <ToolbarButton v-for="item in sections[0]" :key="item.label" :icon="item.icon" @click="item.onClick" />
  </div>
</template>
