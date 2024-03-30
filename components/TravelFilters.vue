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

watch(query, (newValue: Query) => {
  emit('queryFilters', newValue)
})
</script>

<template>
  <div class="my-6">
    <div class="flex flex-col gap-4 md:flex-row">
      <div class="flex gap-4">
        <div class="mt-2">
          <label
            for="search"
            class="block mb-2 font-bold"
          >
            Search
          </label>
          <InputText
            v-model="searchQuery"
            input-id="search"
            type="text"
          />
        </div>
      </div>
      <div class="mt-2">
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
        />
        <Slider
          v-model="priceRange"
          :min="0"
          :max="5000"
          class="w-auto mt-4"
        />
      </div>
      <div class="mt-2">
        <label
          for="rating"
          class="block mb-2 font-bold"
        >
          Min rate
        </label>
        <Rating
          v-model="rating as number | undefined"
          input-id="rating"
          class="mt-5"
        />
      </div>
    </div>
  </div>
</template>
