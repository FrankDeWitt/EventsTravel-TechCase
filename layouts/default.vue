<script lang="ts" setup></script>

<template>
  <div class="body-wrapper">
    <BaseHeader />
    <div class="p-6 mt-24 sm:mx-auto sm:container my-px-6 lg:p-8">
      <slot />
    </div>
    <BaseFooter />
  </div>
</template>

<style>
.body-wrapper {
  display: flex;
  flex-direction: column;
}
@media (min-width: 1024px) {
  .body-wrapper {
    display: grid;
    grid-template-rows: min-content auto min-content;
    height: 100vh;
  }
}
</style>
