<script setup lang="ts">
import {
  Bold,
  Italic,
  ListTodo,
  MessageSquarePlus,
  Printer,
  Redo2,
  RemoveFormatting,
  SpellCheck,
  Underline,
  Undo2,
} from 'lucide-vue-next'
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const sections = computed(() => [
  [
    {
      label: 'Undo',
      icon: Undo2,
      onClick: () => editor?.chain().focus().undo().run(),
      isActive: false,
    },
    {
      label: 'Redo',
      icon: Redo2,
      onClick: () => editor?.chain().focus().redo().run(),
      isActive: false,
    },
    {
      label: 'Print',
      icon: Printer,
      onClick: () => window.print(),
      isActive: false,
    },
    {
      label: 'Spell Check',
      icon: SpellCheck,
      onClick: () => {
        const current = editor?.view.dom.getAttribute('spellcheck')
        editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false')
      },
      isActive: false,
    },
  ],
  [
    {
      label: 'Bold',
      icon: Bold,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: Italic,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive('italic'),
    },
    {
      label: 'Underline',
      icon: Underline,
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
      isActive: editor?.isActive('underline'),
    },
  ],
  [
    {
      label: 'Comment',
      icon: MessageSquarePlus,
      onClick: () => {},
      isActive: false,
    },
    {
      label: 'List Todo',
      icon: ListTodo,
      onClick: () => editor?.chain().focus().toggleTaskList().run(),
      isActive: editor?.isActive('taskList'),
    },
    {
      label: 'Remove Formatting',
      icon: RemoveFormatting,
      onClick: () => editor?.chain().focus().clearNodes().run(),
      isActive: false,
    },
  ],
])
</script>

<template>
  <div class="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
    <ToolbarButton v-for="item in sections[0]" :key="item.label" :icon="item.icon" @click="item.onClick" />
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <FontFamilyButton />
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <HeadingLevelButton />
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />

    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <ToolbarButton v-for="item in sections[1]" :key="item.label" :icon="item.icon" :is-active="item.isActive" @click="item.onClick" />
    <Separator orientation="vertical" class="h-6 bg-neutral-300" />
    <ToolbarButton v-for="item in sections[2]" :key="item.label" :icon="item.icon" :is-active="item.isActive" @click="item.onClick" />
  </div>
</template>
