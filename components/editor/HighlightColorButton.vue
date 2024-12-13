<script setup lang="ts">
import { Highlighter } from 'lucide-vue-next'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="flex h-7 min-w-7 flex-col items-center justify-center rounded-sm text-sm hover:bg-stone-200/80">
        <Highlighter class="size-4 shrink-0" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-0">
      123
    </DropdownMenuContent>
  </DropdownMenu>
</template>
