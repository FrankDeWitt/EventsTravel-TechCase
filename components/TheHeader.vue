<script lang="ts" setup>
// import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Travels', href: '/' },
  { name: 'Booking', href: '/bookings' },
]

const asideMenuOpen = ref(false)
</script>

<template>
  <header class="bg-white">
    <nav
      class="container flex items-center justify-between p-6 mx-auto lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink
          to="/"
          class="-m-1.5 p-1.5"
        >
          <span class="sr-only">WeRoad</span>
          <TheLogo />
        </NuxtLink>
      </div>
      <div class="flex">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="asideMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon
            class="w-6 h-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
    <TransitionRoot
      :show="asideMenuOpen"
      as="template"
      enter="duration-300 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <Dialog
        as="div"
        :open="asideMenuOpen"
        @close="asideMenuOpen = false"
      >
        <div class="fixed inset-0 z-10" />
        <TransitionChild
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogPanel
            class="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div class="flex items-center justify-between">
              <button
                type="button"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
                @click="asideMenuOpen = false"
              >
                <span class="sr-only">Close menu</span>
                <XMarkIcon
                  class="w-6 h-6"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div class="flow-root mt-6">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="py-6 space-y-2">
                  <NuxtLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    class="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                    @click="asideMenuOpen = false"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </header>
</template>
