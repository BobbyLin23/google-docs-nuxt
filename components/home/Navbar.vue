<script lang="ts" setup>

</script>

<template>
  <nav class="flex items-center justify-between h-full w-full">
    <div class="flex gap-3 items-center shrink-0 pr-6">
      <NuxtLink to="/">
        <NuxtImg src="/logo.svg" alt="logo" height="36" width="36" />
      </NuxtLink>
      <h3 class="text-xl">
        Docs
      </h3>
    </div>
    <HomeSearchInput />
    <div />
  </nav>
</template>
