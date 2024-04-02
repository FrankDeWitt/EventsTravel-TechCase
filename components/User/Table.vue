<script lang="ts" setup>
import { FilterMatchMode } from 'primevue/api'

import type { Travel, User } from '@/types'

const props = defineProps<{
  data: User[] | null
  loading: boolean
}>()

const emit = defineEmits<{
  (event: 'createUser', payload: boolean): void
}>()

const { calculateAge } = useValidations()

const travels = useState<Travel[]>('travels')

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

const getTravelNameById = (travelId: number) => {
  if (!travels.value || !travels.value.length) {
    return 'Loading...'
  }
  const travel = travels.value.find((t) => t.id === travelId)
  return travel ? travel.name : 'Not found'
}
</script>
<template>
  <DataTable
    v-model:filters="filters"
    :value="data"
    paginator
    :rows="10"
    data-key="id"
    filter-display="row"
    :loading="loading"
    :global-filter-fields="['firstName', 'lastName', 'email']"
  >
    <template #header>
      <div class="flex flex-col justify-between gap-2 md:flex-row">
        <InputText
          v-model="filters['global'].value"
          placeholder="Keyword Search"
        />
        <Button
          type="button"
          class="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-primary-500 hover:bg-primary-600 sm:ml-3"
          @click="emit('createUser', true)"
        >
          Add new user
        </Button>
      </div>
    </template>
    <template #empty>
      No customers found.
    </template>
    <template #loading>
      Loading customers data. Please wait.
    </template>
    <Column
      field="firstName"
      header="Name"
      sortable
    >
      <template #body="{ data: firstNameData }">
        {{ firstNameData.firstName }}
      </template>
    </Column>
    <Column
      field="lastName"
      header="Last Name"
      sortable
    >
      <template #body="{ data: lastNameData }">
        {{ lastNameData.lastName }}
      </template>
    </Column>
    <Column
      field="email"
      header="Email"
      sortable
    >
      <template #body="{ data: emailData }">
        {{ emailData.email }}
      </template>
    </Column>
    <Column
      field="phoneNumber"
      header="Phone number"
    >
      <template #body="{ data: phoneNumberData }">
        {{ phoneNumberData.phoneNumber }}
      </template>
    </Column>
    <Column
      field="birthDate"
      header="Age"
    >
      <template #body="{ data: birthDateData }">
        {{ calculateAge(birthDateData.birthDate) }}
      </template>
    </Column>
    <Column
      field="gender"
      header="Gender"
    >
      <template #body="{ data: genderData }">
        {{ genderData.gender }}
      </template>
    </Column>
    <Column
      field="paymentMethod"
      header="Payment method"
      sortable
    >
      <template #body="{ data: paymentMethodData }">
        {{ paymentMethodData.paymentMethod }}
      </template>
    </Column>
    <Column
      field="travelId"
      header="Travel purchase"
      sortable
    >
      <template #body="{ data: travelIdData }">
        {{ getTravelNameById(travelIdData.travelId) }}
      </template>
    </Column>
    <Column
      field="notes"
      header="Notes"
    >
      <template #body="{ data: notesData }">
        {{ notesData.notes }}
      </template>
    </Column>
  </DataTable>
</template>
