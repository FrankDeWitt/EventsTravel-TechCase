<script lang="ts" setup>
import type { Travel } from '@/types'

const travels = useState<Travel[]>('travels')

onMounted(async () => {
  const storedTravels = localStorage.getItem('travels')
  if (travels.value === undefined && storedTravels !== null) {
    try {
      const parsedTravels = JSON.parse(storedTravels) as Travel[]
      travels.value = Array.isArray(parsedTravels) ? parsedTravels : []
    } catch (error) {
      console.error('Error parsing travels from localStorage:', error)
      travels.value = []
    }
  }

  document.documentElement.classList.remove('dark')
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
