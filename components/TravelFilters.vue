<script lang="ts" setup>
import type { Query } from '@/types'

const emit = defineEmits<{
  (event: 'queryFilters', payload: Query): void
}>()
const searchQuery = ref('')
const priceRange = ref<number | undefined>(2500)
const rating = ref<number | null>(null)

const query: ComputedRef<Query> = computed(() => ({
  q: searchQuery.value,
  price: priceRange.value,
  rating: rating.value,
}))

const reset = () => {
  searchQuery.value = ''
  priceRange.value = 2500
  rating.value = null
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
          disabled
          class="w-full"
        />
        <Slider
          v-model="priceRange"
          :min="0"
          :max="5000"
          class="w-auto mt-4"
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
          v-model="rating as number | undefined"
          input-id="rating"
          class="lg:mt-3"
        />
      </div>
      <div class="flex items-center w-full mt-2 lg:w-auto lg:ml-auto">
        <button
          class="w-full lg:w-auto rounded-md text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 px-3.5 py-2.5 text-sm font-semibold hover:bg-white-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="reset()"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>
