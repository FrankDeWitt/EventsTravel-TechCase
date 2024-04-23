<script lang="ts" setup>
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Travels', href: '/' },
  { name: 'Booking', href: '/bookings' },
]

const asideMenuOpen = ref(false)

const verticalPosition = ref<number>(0)
const isScrolled = computed(() => {
  return verticalPosition.value > 30
})
onBeforeMount(() => {
  window.addEventListener('scroll', () => {
    verticalPosition.value = window.scrollY
  })
})
</script>

<template>
  <header
    :class="[
      'duration-300 ease-in-out fixed top-0 z-40 w-full lg:py-2',
      { '!py-0 shadow-lg bg-white': isScrolled },
      { 'shadow-lg bg-white': asideMenuOpen },
    ]"
  >
    <nav
      class="container z-10 flex items-center justify-between p-6 mx-auto lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink
          to="/"
          class="-m-1.5 p-1.5"
        >
          <span class="sr-only">EventsTravel</span>
          <BaseLogo />
        </NuxtLink>
      </div>
      <div class="flex">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="asideMenuOpen = !asideMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon
            v-if="!asideMenuOpen"
            class="w-10 h-10 md:w-8 md:h-8"
            aria-hidden="true"
          />
          <XMarkIcon
            v-else
            class="w-10 h-10 md:w-8 md:h-8"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
    <!-- // OPCION 1 -->
    <HeadlessDialog
      as="div"
      :open="asideMenuOpen"
      @close="asideMenuOpen = false"
    >
      <div class="fixed inset-0 z-10" />
      <HeadlessDialogPanel
        class="fixed top-0 right-0 z-30 flex flex-col items-end w-full px-6 py-6 overflow-y-auto bg-white shadow-lg bottom-2/3 w-ful md:z-30 sm:top-16 sm:bottom-0 sm:max-w-sm"
      >
        <div class="flex items-end gap-x-6">
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700 sm:hidden"
            @click="asideMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon
              class="w-10 h-10 md:w-8 md:h-8"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="flow-root w-full mt-6">
          <div class="flow-root mt-6">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="py-6 space-y-2">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="block px-3 py-2 -mx-3 text-xl font-semibold leading-7 text-gray-900 rounded-lg hover:bg-primary-50"
                  @click="asideMenuOpen = false"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </HeadlessDialogPanel>
    </HeadlessDialog>
  </header>
</template>
