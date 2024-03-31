<script lang="ts" setup>
const travels = useState('travels')

onMounted(async () => {
  if (travels.value === undefined) {
    travels.value = JSON.parse(localStorage.getItem('travels'))
  }
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
