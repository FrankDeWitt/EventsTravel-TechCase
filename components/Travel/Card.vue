<script lang="ts" setup>
import { EllipsisVerticalIcon, StarIcon, ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

import type { Travel } from '@/types'

const props = defineProps<{
  data: Travel
}>()

const emit = defineEmits<{
  (event: 'editTravel', payload: Travel): void
  (event: 'deleteTravel', payload: number): void
}>()

const showingModal = ref(false)
const showingConfirmationModal = ref(false)

const tempData: Travel = reactive({
  id: 0,
  name: '',
  description: '',
  departureDate: '',
  returnDate: '',
  picture: '',
  price: null,
  averageRating: 0,
})

const travelDataFilled = computed(() => {
  return (
    tempData.name !== '' &&
    tempData.description !== '' &&
    tempData.departureDate !== '' &&
    tempData.returnDate !== '' &&
    tempData.picture !== '' &&
    tempData.price !== null
  )
})

const handleUpdate = (updatedData: Travel) => {
  Object.assign(tempData, updatedData)
}

watch(
  () => props.data,
  (newVal) => {
    Object.assign(tempData, newVal)
  },
  { deep: true, immediate: true }
)
</script>
<template>
  <NuxtImg
    class="aspect-[3/2] w-full rounded-t-2xl object-cover"
    :src="data.picture"
  />
  <div class="flex flex-col px-6 py-4 min-h-80">
    <div class="flex items-center justify-between mt-6">
      <h3 class="text-lg font-semibold leading-8 tracking-tight text-gray-900">
        {{ data.name }}
      </h3>
      <div class="flex items-center flex-none gap-x-4">
        <HeadlessMenu
          as="div"
          class="relative flex-none"
        >
          <HeadlessMenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span class="sr-only">Open options</span>
            <EllipsisVerticalIcon
              class="w-5 h-5"
              aria-hidden="true"
            />
          </HeadlessMenuButton>
          <HeadlessTransitionRoot
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <HeadlessMenuItems
              class="absolute right-0 z-10 w-32 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              <HeadlessMenuItem>
                <span
                  class="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer hover:bg-primary-50"
                  @click="showingModal = true"
                >
                  Edit<span class="sr-only">, {{ data.name }}</span>
                </span>
              </HeadlessMenuItem>
              <HeadlessMenuItem>
                <span
                  class="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer hover:bg-primary-50"
                  @click="showingConfirmationModal = true"
                >
                  Delete<span class="sr-only">, {{ data.name }}</span>
                </span>
              </HeadlessMenuItem>
            </HeadlessMenuItems>
          </HeadlessTransitionRoot>
        </HeadlessMenu>
      </div>
    </div>
    <div class="flex flex-wrap items-center text-xs leading-5 text-gray-500 gap-x-2">
      <p class="whitespace-nowrap">Departure {{ data.departureDate }}</p>
      -
      <p class="whitespace-nowrap">Return {{ data.returnDate }}</p>
    </div>
    <p class="mt-2 text-base leading-7 text-gray-600">
      {{ data.description }}
    </p>
    <div class="flex flex-wrap items-end justify-between flex-grow mt-2">
      <div
        v-if="data.averageRating > 0"
        class="flex space-x-2"
      >
        <div class="flex items-center">
          <StarIcon
            v-for="rating in [0, 1, 2, 3, 4]"
            :key="rating"
            :class="[data.averageRating > rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
            aria-hidden="true"
          />
        </div>
        <p class="hidden md:block lg:hidden xl:block">{{ data.averageRating }} out of 5 stars</p>
      </div>
      <div v-else>
        <p>No reviews yet</p>
      </div>
      <p class="font-bold text-wr-red">{{ data.price }}€</p>
    </div>
  </div>
  <BaseModal
    :showing="showingModal"
    size="md"
    @close="showingModal = false"
  >
    <div>
      <div class="text-center">
        <HeadlessDialogTitle
          as="h3"
          class="text-base font-semibold leading-6 text-gray-900"
        >
          Edit travel
        </HeadlessDialogTitle>
        <TravelForm
          :data="tempData"
          @update:data="handleUpdate"
        />
      </div>
    </div>
    <div class="flex gap-3 mt-5 sm:mt-6">
      <Button
        type="button"
        class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm border-surface-500 bg-surface-500 hover:bg-surface-600 hover:border-surface-500"
        @click="showingModal = false"
      >
        Cancel
      </Button>
      <Button
        type="button"
        class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-primary-500 hover:bg-primary-600"
        :disabled="!travelDataFilled"
        @click="emit('editTravel', tempData), (showingModal = false)"
      >
        Save
      </Button>
    </div>
  </BaseModal>
  <BaseModal
    :showing="showingConfirmationModal"
    size="sm"
    @close="showingConfirmationModal = false"
  >
    <div class="sm:flex sm:items-start">
      <div
        class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10"
      >
        <ExclamationTriangleIcon
          class="w-6 h-6 text-primary-500"
          aria-hidden="true"
        />
      </div>
      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <HeadlessDialogTitle
          as="h3"
          class="text-base font-semibold leading-6 text-gray-900"
        >
          Delete "{{ data.name }}" travel
        </HeadlessDialogTitle>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Are you sure you want to delete this travel? <br />Deleting this record could cause users on the Booking
            page to incorrectly display which product they purchased.
          </p>
        </div>
      </div>
    </div>
    <div class="flex gap-3 mt-5 sm:mt-6">
      <Button
        type="button"
        class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm border-surface-500 bg-surface-500 hover:bg-surface-600 hover:border-surface-500"
        @click="showingConfirmationModal = false"
      >
        Cancel
      </Button>
      <Button
        type="button"
        class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-primary-500 hover:bg-primary-600"
        @click="emit('deleteTravel', data.id as number), (showingConfirmationModal = false)"
      >
        Delete Travel
      </Button>
    </div>
  </BaseModal>
</template>
