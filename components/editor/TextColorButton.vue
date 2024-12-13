<script setup lang="ts">
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const value = computed(() => {
  return editor?.getAttributes('textStyle').color || '#000000'
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="flex h-7 min-w-7 flex-col items-center justify-center rounded-sm text-sm hover:bg-stone-200/80">
        <span class="text-xs">A</span>
        <div
          class="h-0.5 w-full"
          :style="{
            backgroundColor: value,
          }"
        />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-0">
      123
    </DropdownMenuContent>
  </DropdownMenu>
</template>
