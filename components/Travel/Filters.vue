<script lang="ts" setup>
import dayjs from 'dayjs'

import type { Query } from '@/types'

const emit = defineEmits<{
  (event: 'queryFilters', payload: Query): void
}>()

const searchQuery = ref('')
const priceRange = ref<number | undefined>(2500)
const rating = ref<number | null>(null)
const departureDate = ref<string>()

const query: ComputedRef<Query> = computed(() => ({
  q: searchQuery.value,
  price: priceRange.value,
  rating: rating.value,
  departureDate: departureDate.value,
}))

const reset = () => {
  searchQuery.value = ''
  priceRange.value = 2500
  rating.value = null
  departureDate.value = ''
}

watch(query, (newValue: Query) => {
  emit('queryFilters', newValue)
})

defineExpose({ reset })
</script>

<template>
  <div class="my-6">
    <div class="flex flex-col gap-6 lg:flex-row">
      <div class="flex lg:gap-4">
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
            class="w-full lg:w-auto"
            type="text"
          />
        </div>
      </div>
      <div class="w-full mt-2 lg:w-auto">
        <label
          for="amount"
          class="block mb-2 font-bold"
        >
          Max travel price
        </label>
        <InputNumber
          v-model="priceRange"
          input-id="amount"
          mode="currency"
          currency="EUR"
          locale="de-DE"
          placeholder="2.500 €"
          class="w-full"
        />
        <Slider
          v-model="priceRange"
          :min="0"
          :max="5000"
          :pt="{ range: { class: 'z-[-1]' } }"
          class="w-auto mt-4"
        />
      </div>
      <div class="flex items-center gap-6 mt-2 lg:gap-0 lg:flex-col lg:items-start">
        <label
          for="departure"
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
      <div class="flex items-center gap-6 mt-2 lg:gap-0 lg:flex-col lg:items-start">
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
      <div class="flex items-center w-full mt-2 lg:w-auto lg:ml-auto">
        <Button
          type="button"
          class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold !text-black bg-white rounded-md shadow-sm border-surface-200 hover:bg-surface-50 hover:border-surface-200"
          @click="reset()"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  </div>
</template>
