<script setup lang="ts">
import { Image, Search, Upload } from 'lucide-vue-next'
import { useEditorStore } from '~/store/editor'

const { editor } = useEditorStore()

const isDialogOpen = ref(false)
const imageUrl = ref('')

function onChange(src: string) {
  editor?.chain().focus().setImage({ src }).run()
}

function onUpload() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = () => {
    if (input.files && input.files.length > 0) {
      const file = input.files[0]
      const imageUrl = URL.createObjectURL(file)
      onChange(imageUrl)
    }
  }
  input.click()
}

function handleImageUrlSubmit() {
  if (imageUrl.value) {
    onChange(imageUrl.value)
    imageUrl.value = ''
    isDialogOpen.value = false
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <Image class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="onUpload">
        <Upload class="size-4 mr-2" />
        Upload
      </DropdownMenuItem>
      <DropdownMenuItem @click="isDialogOpen = true">
        <Search class="size-4 mr-2" />
        Paste image url
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <Dialog v-model:open="isDialogOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Insert image URL</DialogTitle>
      </DialogHeader>
      <Input
        v-model="imageUrl" placeholder="Insert image URL" @keydown.enter="handleImageUrlSubmit"
      />
      <DialogFooter>
        <Button @click="handleImageUrlSubmit">
          Insert
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
