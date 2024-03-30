<script lang="ts" setup></script>

<template>
  <div class="body-wrapper">
    <TheHeader />
    <div class="container mx-auto my-px-6 lg:p-8">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
.body-wrapper {
  display: flex;
  flex-direction: column;
  @media screen(lg) {
    display: grid;
    grid-template-rows: min-content auto min-content;
    height: 100vh;
  }
}
</style>
