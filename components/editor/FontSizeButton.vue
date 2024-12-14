<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const currentFontSize = computed(() => editor?.getAttributes('textStyle').fontSize
  ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
  : '16')

const fontSize = ref(currentFontSize.value)
const inputValue = ref(fontSize.value)
const isEditing = ref(false)

function updateFontSize(newSize: string) {
  const size = Number.parseInt(newSize)
  if (!Number.isNaN(size) && size > 0) {
    editor?.chain().focus().setFontSize(`${size}px`).run()
    fontSize.value = newSize
    inputValue.value = newSize
    isEditing.value = false
  }
}

function increment() {
  const newSize = Number.parseInt(fontSize.value) + 1
  updateFontSize(newSize.toString())
}

function decrement() {
  const newSize = Number.parseInt(fontSize.value) - 1
  updateFontSize(newSize.toString())
}

function handleInputBlur() {
  updateFontSize(inputValue.value)
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault()
    updateFontSize(inputValue.value)
    editor?.commands.focus()
  }
}
</script>

<template>
  <div class="flex items-center gap-x-0.5">
    <button
      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-sm hover:bg-stone-200/80"
      @click="decrement"
    >
      <Minus class="size-4" />
    </button>
    <input
      v-if="isEditing"
      v-model="inputValue"
      type="text"
      class="h-7 w-10 text-sm rounded-sm border border-neutral-400 text-center bg-transparent focus:outline-none focus:ring-0"
      @blur="handleInputBlur"
      @keydown="handleKeyDown"
    >
    <button
      v-else
      class="h-7 w-10 text-sm rounded-sm border border-neutral-400 text-center bg-transparent cursor-text hover:bg-neutral-200/80"
      @click="() => {
        isEditing = true
        fontSize = currentFontSize
      }"
    >
      {{ currentFontSize }}
    </button>
    <button
      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-sm hover:bg-stone-200/80"
      @click="increment"
    >
      <Plus class="size-4" />
    </button>
  </div>
</template>
