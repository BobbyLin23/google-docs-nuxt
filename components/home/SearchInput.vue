<script lang="ts" setup>
import { Search, X } from 'lucide-vue-next'

const value = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const { setSearch } = useSearchParam()

function handleSubmit(event: Event) {
  event.preventDefault()
  setSearch(value.value)
}
</script>

<template>
  <div class="flex flex-1 items-center justify-center">
    <form class="relative max-w-[720px] w-full" @submit="handleSubmit">
      <Input
        ref="inputRef"
        v-model="value"
        placeholder="Search"
        class="md:text-base placeholder:text-neutral-800 px-14 w-full border-none
        focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8]
        rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
      />
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 [&_svg]:size-5 rounded-full"
      >
        <Search />
      </Button>
      <Button
        v-if="value"
        variant="ghost"
        size="icon"
        type="button"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 [&_svg]:size-5 rounded-full"
        @click="() => {
          value = ''
          inputRef?.blur()
          setSearch('')
        }"
      >
        <X />
      </Button>
    </form>
  </div>
</template>
