<script lang="ts" setup>
import dayjs from 'dayjs'

import type { Query } from '@/types'

const emit = defineEmits<{
  (event: 'queryFilters', payload: Query): void
}>()

const searchQuery = ref('')
const priceMin = ref<number>(0)
const priceMax = ref<number>(5000)
const rating = ref<number | null>(null)
const departureDate = ref<string>()

const query: ComputedRef<Query> = computed(() => ({
  q: searchQuery.value,
  priceMin: priceMin.value,
  priceMax: priceMax.value,
  rating: rating.value,
  departureDate: departureDate.value || '',
}))

const reset = () => {
  searchQuery.value = ''
  priceMin.value = 0
  priceMax.value = 5000
  rating.value = null
  departureDate.value = ''
}

watch(query, (newValue: Query) => {
  emit('queryFilters', newValue)
})

defineExpose({ reset })
</script>

<template>
  <div class="grid grid-cols-1 gap-y-4 gap-x-3 lg:gap-x-1 xl:gap-x-6 md:grid-cols-3 lg:grid-cols-8 2xl:grid-cols-6">
    <div class="flex w-full col-span-1 md:col-span-1 lg:col-span-2 lg:gap-4 2xl:col-span-1">
      <div class="w-full mt-2">
        <label
          for="search"
          class="block mb-2 font-bold"
        >
          Search
        </label>
        <InputText
          v-model="searchQuery"
          input-id="search"
          class="w-full"
          type="text"
        />
      </div>
    </div>
    <div class="w-full col-span-1 mt-2 md:col-span-1 lg:col-span-2 lg:w-auto 2xl:col-span-1">
      <label
        for="amount"
        class="block mb-2 font-bold"
      >
        Min travel price
      </label>
      <InputNumber
        v-model="priceMin"
        input-id="amount"
        mode="currency"
        currency="EUR"
        locale="de-DE"
        placeholder="0 €"
        class="w-full"
      />
      <Slider
        v-model="priceMin"
        :min="0"
        :max="5000"
        class="w-auto mt-4"
      />
    </div>
    <div class="w-full col-span-1 mt-2 md:col-span-1 lg:col-span-2 lg:w-auto 2xl:col-span-1">
      <label
        for="amount"
        class="block mb-2 font-bold"
      >
        Max travel price
      </label>
      <InputNumber
        v-model="priceMax"
        input-id="amount"
        mode="currency"
        currency="EUR"
        locale="de-DE"
        placeholder="5.000 €"
        class="w-full"
      />
      <Slider
        v-model="priceMax"
        :min="0"
        :max="5000"
        class="w-auto mt-4"
      />
    </div>
    <div class="w-full col-span-1 mt-2 md:col-span-1 lg:col-span-2 lg:w-auto 2xl:col-span-1">
      <label
        for="amount"
        class="block mb-2 font-bold"
      >
        Future Departure Dates
      </label>
      <Calendar
        id="departure"
        date-format="dd/mm/yy"
        class="w-full"
        :model-value="departureDate"
        @update:model-value="departureDate = dayjs($event).format('DD/MM/YYYY')"
      />
    </div>
    <div
      class="flex items-center col-span-1 gap-6 mt-2 md:col-span-2 lg:col-span-2 2xl:col-span-1 lg:gap-0 md:flex-col md:items-start"
    >
      <label
        for="rating"
        class="block font-bold lg:mb-2"
      >
        Min rate
      </label>
      <Rating
        v-model="rating"
        input-id="rating"
        class="lg:mt-3"
      />
    </div>
    <div
      class="flex items-center w-full col-span-1 mt-2 md:col-span-3 lg:col-span-2 lg:col-start-7 2xl:col-span-1 lg:w-auto lg:ml-auto"
    >
      <Button
        type="button"
        class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold !text-black bg-white rounded-md shadow-sm border-surface-200 hover:bg-surface-50 hover:border-surface-200"
        @click="reset()"
      >
        Reset Filters
      </Button>
    </div>
  </div>
</template>
