<script lang="ts" setup>
import type { Travel } from '@/types'

const query = ref({})

const { travels, pending, refresh } = await useGetTravels(query)

const handleDelete = async (travelId: number) => {
  await useRemoveTravel(travelId)
  refresh()
}
const handleEdit = async (travelData: Travel) => {
  await useEditTravel(travelData)
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
      class="grid grid-cols-1 md:grid-cols-2 justify-center lg:grid-cols-3 grid-auto-columns-1/2 lg:grid-auto-columns-1/3 gap-x-3 auto-rows-fr gap-y-5"
      role="list"
    >
      <li
        v-for="travel in travels"
        :key="travel.id"
        class="gap-x-6 rounded overflow-hidden shadow-lg rounded-b-2xl"
      >
        <TravelCard
          :data="travel"
          :loading="pending"
          @delete-travel="handleDelete"
          @edit-travel="handleEdit"
        />
      </li>
    </ul>
  </div>
</template>
