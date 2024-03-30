<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon, StarIcon } from '@heroicons/vue/20/solid'

import type { Travel } from '@/types'
defineProps<{
  data: Travel
}>()
</script>
<template>
  <NuxtImg
    class="aspect-[3/2] w-full rounded-t-2xl object-cover"
    :src="data.picture"
  />
  <div class="px-6 py-4">
    <div class="mt-6 flex justify-between items-center">
      <h3 class="text-lg font-semibold leading-8 tracking-tight text-gray-900">
        {{ data.name }}
      </h3>
      <div class="flex flex-none items-center gap-x-4">
        <Menu
          as="div"
          class="relative flex-none"
        >
          <MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span class="sr-only">Open options</span>
            <EllipsisVerticalIcon
              class="h-5 w-5"
              aria-hidden="true"
            />
          </MenuButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                >
                  Edit<span class="sr-only">, {{ data.name }}</span>
                </a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                >
                  Delete<span class="sr-only">, {{ data.name }}</span>
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <div class="flex items-center gap-x-2 text-xs leading-5 text-gray-500">
      <p class="whitespace-nowrap">Departure {{ data.departureDate }}</p>
      -
      <p class="whitespace-nowrap">Return {{ data.returnDate }}</p>
    </div>
    <p class="mt-2 text-base leading-7 text-gray-600">
      {{ data.description }}
    </p>
    <div class="flex flex-wrap justify-between items-center mt-2">
      <div class="flex space-x-2">
        <div class="flex items-center">
          <StarIcon
            v-for="rating in [0, 1, 2, 3, 4]"
            :key="rating"
            :class="[data.averageRating > rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
            aria-hidden="true"
          />
        </div>
        <p>{{ data.averageRating }} out of 5 stars</p>
      </div>
      <p class="text-wr-red font-bold">{{ data.price }}€</p>
    </div>
  </div>
</template>
