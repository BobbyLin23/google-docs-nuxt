<script setup lang="ts">
import { List, ListOrdered } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const lists = [
  {
    label: 'Bullet List',
    icon: List,
    isActive: () => editor?.isActive('bulletList'),
    onClick: () => editor?.chain().focus().toggleBulletList().run(),
  },
  {
    label: 'Ordered List',
    icon: ListOrdered,
    isActive: () => editor?.isActive('orderedList'),
    onClick: () => editor?.chain().focus().toggleOrderedList().run(),
  },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="flex h-7 min-w-7 flex-col items-center justify-center rounded-sm text-sm hover:bg-stone-200/80">
        <List class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="({ label, onClick, icon, isActive }) in lists"
        :key="label"
        :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-md hover:bg-neutral-200/80',
                   isActive() && 'bg-neutral-200/80',
        )"
        @click="onClick"
      >
        <component :is="icon" class="size-4" />
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
