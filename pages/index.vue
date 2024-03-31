<script lang="ts" setup>
import TravelFilters from '@/components/TravelFilters.vue'

import { PlusIcon } from '@heroicons/vue/24/outline'

import type { Travel, Travels } from '@/types'

const query = ref({})

const { travels, pending, refresh } = useGetTravels(query)
const stateTravels = useState('travels', 'default value')

const open = ref(false)
const filtersRef = ref<typeof TravelFilters | null>(null)

const tempData = reactive({
  name: '',
  description: '',
  departureDate: '',
  returnDate: '',
  picture: '',
  price: 0,
  averageRating: 0,
})
const handleUpdate = (updatedData: Travel) => {
  Object.assign(tempData, updatedData)
}
const handleDelete = async (travelId: number) => {
  await useRemoveTravel(travelId)
  refresh()
}
const handleEdit = async (travelData: Travel) => {
  await useEditTravel(travelData)
  refresh()
}
const handleCreate = async () => {
  await useCreateTravel(tempData)
  resetFitlers()
  refresh()
}
const resetFitlers = () => {
  if (filtersRef.value) {
    filtersRef.value?.reset()
  }
}

watch(travels, (newValue: Travels) => {
  stateTravels.value = newValue
  localStorage.setItem('travels', JSON.stringify(newValue))
})
onMounted(async () => {
  stateTravels.value = travels.value
  localStorage.setItem('travels', JSON.stringify(travels.value))
})
</script>
<template>
  <div>
    <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Travels</p>
    <TravelFilters
      ref="filtersRef"
      :data="travels"
      @query-filters="query = $event"
    />
    <ul
      class="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-auto-columns-1/2 lg:grid-auto-columns-1/3 gap-x-3 auto-rows-fr gap-y-5"
      role="list"
    >
      <template v-if="pending">
        <div
          v-for="item in 6"
          :key="item"
        >
          <TravelSkeleton />
        </div>
      </template>
      <template v-else-if="!pending && travels.length > 0">
        <li
          v-for="travel in travels"
          :key="travel.id"
          class="overflow-hidden rounded shadow-lg gap-x-6 rounded-b-2xl"
        >
          <TravelCard
            :data="travel"
            :loading="pending"
            @delete-travel="handleDelete"
            @edit-travel="handleEdit"
          />
        </li>
      </template>
      <template v-else>
        <div class="col-span-3 text-center">
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Travels Not Found</h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Oops, it seems there are no travels matching your search criteria.
          </p>
          <div class="flex items-center justify-center mt-10 gap-x-6">
            <button
              class="rounded-md bg-wr-red px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="open = true"
            >
              Add New Travel
            </button>
            <button
              class="rounded-md text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 px-3.5 py-2.5 text-sm font-semibold hover:bg-white-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="resetFitlers"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </template>
    </ul>
    <button
      class="fixed bottom-0 right-0 flex items-center justify-center w-12 h-12 mb-10 mr-10 rounded-full shadow-sm bg-wr-red hover:bg-red-600"
      @click="open = true"
    >
      <PlusIcon
        class="w-6 h-6 text-white"
        aria-hidden="true"
      />
    </button>
    <HeadlessTransitionRoot
      as="template"
      :show="open"
    >
      <HeadlessDialog
        as="div"
        class="relative z-10"
        @close="open = false"
      >
        <HeadlessTransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <HeadlessTransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialogPanel
                class="relative w-full px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-md lg:max-w-2xl sm:p-6"
              >
                <div>
                  <div class="text-center">
                    <HeadlessDialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      Create new travel
                    </HeadlessDialogTitle>
                    <TravelForm
                      :data="tempData"
                      @update:data="handleUpdate"
                    />
                  </div>
                </div>
                <div class="flex gap-3 mt-5 sm:mt-6">
                  <button
                    type="button"
                    class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                    @click="open = false"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 sm:ml-3"
                    @click="handleCreate(), (open = false)"
                  >
                    Save
                  </button>
                </div>
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </div>
</template>
