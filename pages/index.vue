<script lang="ts" setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PlusIcon } from '@heroicons/vue/24/outline'

import type { Travel } from '@/types'

const query = ref({})

const { travels, pending, refresh } = await useGetTravels(query)

const open = ref(false)
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
  console.log('🚀 ~ tempData:', tempData)
  await useCreateTravel(tempData)
  refresh()
}
</script>
<template>
  <div>
    <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Travels
    </p>
    <TravelFilters
      :data="travels"
      @query-filters="query = $event"
    />

    <ul
      class="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-auto-columns-1/2 lg:grid-auto-columns-1/3 gap-x-3 auto-rows-fr gap-y-5"
      role="list"
    >
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
                      Create new travel
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
                    @click="handleCreate(), (open = true)"
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
  </div>
</template>
