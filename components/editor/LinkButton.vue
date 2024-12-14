<script setup lang="ts">
import { Link2 } from 'lucide-vue-next'
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const value = ref(editor?.getAttributes('link').href || '')

function onChange(href: string) {
  editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
  value.value = ''
}
</script>

<template>
  <DropdownMenu
    :on-open-change="(open: boolean) => {
      if (open) {
        value.value = editor?.getAttributes('link').href || ''
      }
    }"
  >
    <DropdownMenuTrigger>
      <button class="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-stone-200/80">
        <Link2 class="size-4 shrink-0" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-2.5 flex items-center gap-x-2">
      <Input
        v-model="value"
        placeholder="Paste your link here"
      />
      <Button @click="onChange(value)">
        Apply
      </Button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
