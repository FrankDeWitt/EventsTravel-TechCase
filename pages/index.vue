<script lang="ts" setup>
const { data: travels } = await useFetch('/api/travels')

const searchQuery = ref('')

const filteredData = computed(() => {
  return (travels.value ?? []).filter((travel) => travel.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>
<template>
  <div>
    <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Travels</p>
    <div class="my-6">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Search
        </label>
        <div class="mt-2">
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            name="search"
            class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Type here your search"
          />
        </div>
      </div>
    </div>
    <ul
      class="grid grid-cols-1 md:grid-cols-2 justify-center lg:grid-cols-3 grid-auto-columns-1/2 lg:grid-auto-columns-1/3 gap-x-3 auto-rows-fr gap-y-5"
      role="list"
    >
      <li
        v-for="travel in filteredData"
        :key="travel.id"
        class="gap-x-6 rounded overflow-hidden shadow-lg rounded-b-2xl"
      >
        <TravelCard :data="travel" />
      </li>
    </ul>
  </div>
</template>
