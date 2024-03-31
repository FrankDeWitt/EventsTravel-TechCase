<script lang="ts" setup>
import { FilterMatchMode } from 'primevue/api'

import type { Travel } from '@/types'

const { users, pending, refresh } = useGetUsers()

const travels = useState<Travel[]>('travels')

const openWizard = ref(false)
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
  <div>
    <DataTable
      v-model:filters="filters"
      :value="users"
      paginator
      :rows="10"
      data-key="id"
      filter-display="row"
      :loading="pending"
      :global-filter-fields="['firstName', 'lastName', 'email']"
    >
      <template #header>
        <div class="flex justify-between">
          <IconField icon-position="left">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />
          </IconField>
          <button
            type="button"
            class="justify-center px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-primary-500 hover:bg-primary-600 sm:ml-3"
            @click="openWizard = true"
          >
            Add new user
          </button>
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column
        field="firstName"
        header="Name"
      >
        <template #body="{ data }">
          {{ data.firstName }}
        </template>
      </Column>
      <Column
        field="lastName"
        header="Last Name"
      >
        <template #body="{ data }">
          {{ data.lastName }}
        </template>
      </Column>
      <Column
        field="email"
        header="Email"
      >
        <template #body="{ data }">
          {{ data.email }}
        </template>
      </Column>
      <Column
        field="phoneNumber"
        header="Phone number"
      >
        <template #body="{ data }">
          {{ data.phoneNumber }}
        </template>
      </Column>
      <Column
        field="age"
        header="Age"
        sortable
      >
        <template #body="{ data }">
          {{ data.age }}
        </template>
      </Column>
      <Column
        field="gender"
        header="Gender"
      >
        <template #body="{ data }">
          {{ data.gender }}
        </template>
      </Column>
      <Column
        field="paymentMethod"
        header="Payment method"
      >
        <template #body="{ data }">
          {{ data.paymentMethod }}
        </template>
      </Column>
      <Column
        field="travelId"
        header="Travel purchase"
        sortable
      >
        <template #body="{ data }">
          {{ getTravelNameById(data.travelId) }}
        </template>
      </Column>
      <Column
        field="notes"
        header="Notes"
      >
        <template #body="{ data }">
          {{ data.notes }}
        </template>
      </Column>
    </DataTable>
    <HeadlessTransitionRoot
      as="template"
      :show="openWizard"
    >
      <HeadlessDialog
        as="div"
        class="relative z-10"
        @close="openWizard = false"
      >
        <HeadlessTransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <HeadlessTransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialogPanel
                class="relative w-full px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-md lg:max-w-2xl sm:p-6"
              >
                <div>
                  <div class="text-center">
                    <HeadlessDialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      Create new travel
                    </HeadlessDialogTitle>
                    <Stepper>
                      <StepperPanel header="Header I">
                        <template #content="{ nextCallback }">
                          <div class="flex flex-col h-[12rem]">
                            <div
                              class="flex items-center justify-center flex-auto font-medium border-2 border-dashed rounded-md border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
                            >
                              Content I
                            </div>
                          </div>
                          <div class="flex justify-end pt-4">
                            <Button
                              label="Next"
                              icon="pi pi-arrow-right"
                              iconPos="right"
                              @click="nextCallback"
                            />
                          </div>
                        </template>
                      </StepperPanel>
                      <StepperPanel header="Header II">
                        <template #content="{ prevCallback, nextCallback }">
                          <div class="flex flex-col h-[12rem]">
                            <div
                              class="flex items-center justify-center flex-auto font-medium border-2 border-dashed rounded-md border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
                            >
                              Content II
                            </div>
                          </div>
                          <div class="flex justify-between pt-4">
                            <Button
                              label="Back"
                              severity="secondary"
                              icon="pi pi-arrow-left"
                              @click="prevCallback"
                            />
                            <Button
                              label="Next"
                              icon="pi pi-arrow-right"
                              iconPos="right"
                              @click="nextCallback"
                            />
                          </div>
                        </template>
                      </StepperPanel>
                      <StepperPanel header="Header III">
                        <template #content="{ prevCallback }">
                          <div class="flex flex-col h-[12rem]">
                            <div
                              class="flex items-center justify-center flex-auto font-medium border-2 border-dashed rounded-md border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
                            >
                              Content III
                            </div>
                          </div>
                          <div class="flex justify-start pt-4">
                            <Button
                              label="Back"
                              severity="secondary"
                              icon="pi pi-arrow-left"
                              @click="prevCallback"
                            />
                          </div>
                        </template>
                      </StepperPanel>
                    </Stepper>
                  </div>
                </div>
                <div class="flex gap-3 mt-5 sm:mt-6">
                  <button
                    type="button"
                    class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                    @click="openWizard = false"
                  >
                    Cancel
                  </button>
                </div>
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </div>
</template>
