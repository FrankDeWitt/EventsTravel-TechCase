<script lang="ts" setup>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { EllipsisVerticalIcon, StarIcon, ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

import type { Travel } from '@/types'

const props = defineProps<{
  data: Travel
  loading: Boolean
}>()

const open = ref(false)
const openConfirmation = ref(false)

const tempData = reactive({
  id: 0,
  name: '',
  description: '',
  departureDate: '',
  returnDate: '',
  picture: '',
  price: 0,
  averageRating: 0,
})

const emit = defineEmits<{
  (event: 'deleteTravel', payload: number): void
  (event: 'editTravel', payload: Travel): void
}>()

function handleUpdate(updatedData: Travel) {
  Object.assign(tempData, updatedData)
}

watch(
  () => props.data,
  (newVal) => {
    tempData.id = newVal.id
    tempData.name = newVal.name
    tempData.description = newVal.description
    tempData.departureDate = newVal.departureDate
    tempData.returnDate = newVal.returnDate
    tempData.picture = newVal.picture
    tempData.price = newVal.price
    tempData.averageRating = newVal.averageRating
  },
  { deep: true, immediate: true }
)
</script>
<template>
  <template v-if="loading">
    <Skeleton
      height="14rem"
      class="mb-2"
    />
    <div class="p-4">
      <Skeleton
        width="10rem"
        class="mb-2"
      />
      <Skeleton
        width="5rem"
        class="mb-2"
      />
      <Skeleton
        height="2rem"
        class="mb-2"
      />
      <div class="flex justify-between">
        <Skeleton
          width="5rem"
          class="mb-2"
        /><Skeleton
          width="5rem"
          class="mb-2"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <NuxtImg
      class="aspect-[3/2] w-full rounded-t-2xl object-cover"
      :src="data.picture"
    />
    <div class="px-6 py-4">
      <div class="flex items-center justify-between mt-6">
        <h3 class="text-lg font-semibold leading-8 tracking-tight text-gray-900">
          {{ data.name }}
        </h3>
        <div class="flex items-center flex-none gap-x-4">
          <Menu
            as="div"
            class="relative flex-none"
          >
            <MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span class="sr-only">Open options</span>
              <EllipsisVerticalIcon
                class="w-5 h-5"
                aria-hidden="true"
              />
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 z-10 w-32 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <span
                    :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                    @click="open = !open"
                  >
                    Edit<span class="sr-only">, {{ data.name }}</span>
                  </span>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <span
                    :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                    @click="openConfirmation = true"
                  >
                    Delete<span class="sr-only">, {{ data.name }}</span>
                  </span>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <div class="flex items-center text-xs leading-5 text-gray-500 gap-x-2">
        <p class="whitespace-nowrap">Departure {{ data.departureDate }}</p>
        -
        <p class="whitespace-nowrap">Return {{ data.returnDate }}</p>
      </div>
      <p class="mt-2 text-base leading-7 text-gray-600">
        {{ data.description }}
      </p>
      <div class="flex flex-wrap items-center justify-between mt-2">
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
        <p class="font-bold text-wr-red">{{ data.price }}€</p>
      </div>
    </div>
    <TransitionRoot
      as="template"
      :show="open"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="open = false"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-md sm:p-6"
              >
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      Edit travel Panel
                    </DialogTitle>
                    <TravelForm
                      :data="tempData"
                      @update:data="handleUpdate"
                    />
                  </div>
                </div>
                <div class="flex gap-3 mt-5 sm:mt-6">
                  <button
                    type="button"
                    class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                    @click="open = false"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 sm:ml-3"
                    @click="emit('editTravel', tempData), (open = false)"
                  >
                    Save
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <TransitionRoot
      as="template"
      :show="openConfirmation"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="openConfirmation = false"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div class="sm:flex sm:items-start">
                  <div
                    class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <ExclamationTriangleIcon
                      class="w-6 h-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      Delete {{ data.name }}
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Are you sure you want to delete this travel?</p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    @click="emit('deleteTravel', data.id)"
                  >
                    Delete Travel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="openConfirmation = false"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
</template>
