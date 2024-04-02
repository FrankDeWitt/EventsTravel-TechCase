<script lang="ts" setup>
import Filters from '@/components/travel/Filters.vue'

import { PlusIcon } from '@heroicons/vue/24/outline'

import type { Travel, Travels } from '@/types'

useHead({
  title: 'Manage Travels',
})
const { isMobile } = useDevice()

const query = ref({})
const showingModal = ref(false)

const { travels, pending, refresh } = useGetTravels(query)
const stateTravels = useState<Travel[]>('travels', () => [])

const filtersRef = ref<typeof Filters | null>(null)

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

const tempData: Travel = reactive({
  name: '',
  description: '',
  departureDate: '',
  returnDate: '',
  picture: '',
  price: null,
  averageRating: 0,
})

const resetNewTravelTemplate = () => {
  tempData.name = ''
  tempData.description = ''
  tempData.departureDate = ''
  tempData.returnDate = ''
  tempData.picture = ''
  tempData.price = null
  tempData.averageRating = 0
}

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
  resetNewTravelTemplate()
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
    <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Travels
    </p>
    <div class="my-6">
      <Panel
        v-if="isMobile"
        header="Filters"
        toggleable
      >
        <TravelFilters
          ref="filtersRef"
          @query-filters="query = $event"
        />
      </Panel>

      <TravelFilters
        v-show="!isMobile"
        ref="filtersRef"
        @query-filters="query = $event"
      />
    </div>
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
        <div class="col-span-3 mt-20 text-center">
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Travels Not Found
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Oops, it seems there are no travels matching your search criteria.
          </p>
          <div class="flex items-center justify-center mt-10 gap-x-6">
            <Button
              type="button"
              class="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-primary-500 hover:bg-primary-600"
              @click="showingModal = true"
            >
              Add New Travel
            </Button>
            <Button
              type="button"
              class="inline-flex justify-center px-3 py-2 text-sm font-semibold !text-black bg-white rounded-md shadow-sm border-surface-200 hover:bg-surface-50 hover:border-surface-200"
              @click="resetFitlers"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </template>
    </ul>
    <Button
      class="!fixed !right-0 !bottom-0 text-white mr-5 mb-5 lg:mb-10 lg:mr-10 bg-primary-500 hover:bg-primary-600 sm:ml-3"
      @click="showingModal = true"
    >
      <PlusIcon
        class="w-6 h-6 text-white"
        aria-hidden="true"
      />
    </Button>
    <BaseModal
      :showing="showingModal"
      size="md"
      @close="(showingModal = false), resetNewTravelTemplate()"
    >
      <div>
        <div class="text-center">
          <HeadlessDialogTitle
            as="h3"
            class="mb-6 text-base font-semibold leading-6 text-gray-900"
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
        <Button
          type="button"
          class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm border-surface-500 bg-surface-500 hover:bg-surface-600 hover:border-surface-500"
          @click="(showingModal = false), resetNewTravelTemplate()"
        >
          Cancel
        </Button>
        <Button
          type="button"
          class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-primary-500 hover:bg-primary-600"
          :disabled="!travelDataFilled"
          @click="handleCreate(), (showingModal = false)"
        >
          Save
        </Button>
      </div>
    </BaseModal>
  </div>
</template>
