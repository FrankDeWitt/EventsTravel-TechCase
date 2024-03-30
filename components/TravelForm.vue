<script lang="ts" setup>
import dayjs from 'dayjs'

import type { Travel } from '@/types'

const props = defineProps<{
  data: Travel
}>()

const emit = defineEmits<{
  (event: 'update:data', payload: Travel): void
}>()

const localData = ref({ ...props.data })

function updateField(fieldName: string, value: string | number) {
  localData.value[fieldName] = value
  emit('update:data', localData.value)
}

watchEffect(() => {
  Object.assign(localData.value, props.data)
})
</script>
<template>
  <form>
    <div class="pb-4 border-b lg:pb-12 border-gray-900/10">
      <div class="grid lg:mt-10 gap-x-6 gap-y-4 lg:gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-6">
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-left text-gray-900"
          >
            Travel name
          </label>
          <InputText
            id="name"
            :value="localData.name"
            class="w-full"
            @update:model-value="updateField('name', $event)"
          />
        </div>
        <div class="sm:col-span-6">
          <label
            for="description"
            class="block text-sm font-medium leading-6 text-left text-gray-900"
          >
            Travel description
          </label>
          <Textarea
            id="description"
            :value="localData.description"
            class="w-full h-24 lg:h-32"
            @update:model-value="updateField('description', $event)"
          />
        </div>
        <div class="text-left sm:col-span-3">
          <label
            for="departure"
            class="block text-sm font-medium leading-6 text-left text-gray-900"
          >
            Departure date
          </label>
          <Calendar
            id="departure"
            date-format="dd/mm/yy"
            class="w-full"
            :model-value="localData.departureDate"
            @update:model-value="updateField('departureDate', dayjs($event).format('DD/MM/YYYY'))"
          />
        </div>
        <div class="text-left sm:col-span-3">
          <label
            for="return"
            class="block text-sm font-medium leading-6 text-left text-gray-900"
          >
            Return date
          </label>
          <Calendar
            id="return"
            date-format="dd/mm/yy"
            class="w-full"
            :model-value="localData.returnDate"
            @update:model-value="updateField('returnDate', dayjs($event).format('DD/MM/YYYY'))"
          />
        </div>
        <div class="text-left sm:col-span-6">
          <label
            for="picture"
            class="block text-sm font-medium leading-6 text-left text-gray-900"
          >
            Travel picture
          </label>
          <InputText
            id="picture"
            :value="localData.picture"
            class="w-full"
            @update:model-value="updateField('picture', $event)"
          />
        </div>
        <div class="sm:col-span-3">
          <label
            for="rating"
            class="block text-sm font-medium leading-6 text-left text-gray-900"
          >
            Rating
          </label>
          <Rating
            id="rating"
            :model-value="localData.averageRating"
            :cancel="false"
            class="mt-3"
            @update:model-value="updateField('averageRating', $event)"
          />
        </div>
        <div class="text-left sm:col-span-3">
          <label
            for="price"
            class="block text-sm font-medium leading-6 text-left text-gray-900"
          >
            Travel price
          </label>
          <InputNumber
            id="price"
            class="w-full"
            :model-value="localData.price"
            @update:model-value="updateField('price', $event)"
          />
        </div>
      </div>
    </div>
  </form>
</template>
