<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

import type { Travel, User } from '@/types'

const { emailValidation, phoneValidation, dateOfBirthValidation } = useValidations()

const { users, pending, refresh } = useGetUsers()

const travels = useState<Travel[]>('travels')

const openWizard = ref(false)
const active = ref(0)
const selectedTravel = ref('')

const paymentMethods = [
  {
    id: 1,
    value: 'Paypal',
    logo: 'https://w7.pngwing.com/pngs/720/939/png-transparent-paypal-computer-icons-logo-paypal-blue-angle-service-thumbnail.png',
  },
  { id: 2, value: 'Revolut', logo: 'https://asset.brandfetch.io/idfFwYU4-9/idtPX9K4r8.png' },
  { id: 3, value: 'Bank Transfer', logo: 'https://www.freeiconspng.com/thumbs/bank-icon/bank-icon-5.png' },
]

const newUser: User = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  birthdate: undefined,
  gender: null,
  paymentMethod: 'Paypal',
  travelId: null,
  notes: '',
})

const isEmailValid = ref<boolean | undefined>(undefined)
const isPhoneValid = ref<boolean | undefined>(undefined)
const isBirthdateValid = ref<boolean | undefined>(undefined)

const userDataFilled = computed(() => {
  return (
    newUser.firstName !== '' &&
    newUser.lastName !== '' &&
    newUser.gender !== null &&
    isEmailValid.value === true &&
    isPhoneValid.value === true &&
    isBirthdateValid.value === true
  )
})

const resetNewUserTemplate = async () => {
  newUser.firstName = ''
  newUser.lastName = ''
  newUser.email = ''
  newUser.phoneNumber = ''
  newUser.birthdate = undefined
  newUser.gender = null
  newUser.paymentMethod = 'Paypal'
  newUser.travelId = null
  newUser.notes = ''
}

const handleCreate = async () => {
  openWizard.value = false
  await useCreateUser(newUser)
  resetNewUserTemplate()
  refresh()
}
</script>

<template>
  <div>
    <UserTable
      :data="users"
      :loading="pending"
      @create-user="openWizard = $event"
    />
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
          <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center">
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
                class="relative w-full px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full lg:max-w-4xl sm:p-6"
              >
                <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    class="text-gray-400 bg-white rounded-md hover:text-gray-500"
                    @click="openWizard = false"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon
                      class="w-10 h-10 md:w-8 md:h-8"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div>
                  <div class="text-center">
                    <HeadlessDialogTitle
                      as="h3"
                      class="mb-6 text-base font-semibold leading-6 text-gray-900"
                    >
                      Create new user
                    </HeadlessDialogTitle>
                    <Stepper
                      v-model:activeStep="active"
                      linear
                    >
                      <StepperPanel>
                        <template #content="{ nextCallback }">
                          <div class="flex flex-col">
                            <div
                              class="lg:h-[23rem] flex items-start justify-center flex-auto font-medium border-2 border-dashed rounded-md border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
                            >
                              <div class="flex flex-col p-4">
                                <div class="mb-3 text-xl font-semibold text-center">
                                  Select the travel
                                </div>
                                <div class="grid grid-cols-2 gap-8">
                                  <Listbox
                                    :value="newUser.travelId"
                                    :options="travels"
                                    filter
                                    option-label="name"
                                    class="col-span-2 md:col-span-1"
                                    @update:model-value="
                                      (newUser.travelId = $event.id), (selectedTravel = $event.picture)
                                    "
                                  />
                                  <NuxtImg
                                    class="hidden md:block aspect-[3/2] object-cover w-full h-full col-span-1 rounded-2xl"
                                    :src="
                                      newUser.travelId
                                        ? selectedTravel
                                        : 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg'
                                    "
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-end pt-4">
                            <Button
                              label="Next"
                              icon="pi pi-arrow-right"
                              icon-pos="right"
                              :disabled="newUser.travelId === null"
                              @click="nextCallback"
                            />
                          </div>
                        </template>
                      </StepperPanel>
                      <StepperPanel>
                        <template #content="{ prevCallback, nextCallback }">
                          <div class="flex flex-col">
                            <div
                              class="lg:h-[23rem] flex items-start justify-center flex-auto font-medium border-2 border-dashed rounded-md border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
                            >
                              <div class="flex flex-col p-4">
                                <div class="mb-3 text-xl font-semibold text-center">
                                  Fill the user information
                                </div>
                                <div class="grid gap-x-6 gap-y-4 lg:gap-y-8 sm:grid-cols-6">
                                  <div class="sm:col-span-2">
                                    <label
                                      for="firstName"
                                      class="block text-sm font-medium leading-6 text-left text-gray-900"
                                    >
                                      First name
                                    </label>
                                    <InputText
                                      id="firstName"
                                      v-model="newUser.firstName"
                                      class="w-full"
                                    />
                                  </div>
                                  <div class="sm:col-span-2">
                                    <label
                                      for="lastName"
                                      class="block text-sm font-medium leading-6 text-left text-gray-900"
                                    >
                                      Last name
                                    </label>
                                    <InputText
                                      id="lastName"
                                      v-model="newUser.lastName"
                                      class="w-full"
                                    />
                                  </div>
                                  <div class="sm:col-span-2">
                                    <label
                                      for="age"
                                      :class="[
                                        isBirthdateValid === false ? '!text-red-500' : 'text-gray-900',
                                        'block text-sm font-medium leading-6 text-left',
                                      ]"
                                    >
                                      Age
                                    </label>
                                    <InputMask
                                      id="age"
                                      v-model="newUser.birthdate"
                                      mask="99/99/9999"
                                      placeholder="dd/mm/yyyy"
                                      class="w-full"
                                      @blur="isBirthdateValid = dateOfBirthValidation(newUser.birthdate)"
                                    />
                                  </div>
                                  <div class="sm:col-span-2">
                                    <label
                                      for="email"
                                      :class="[
                                        isEmailValid === false ? '!text-red-500' : 'text-gray-900',
                                        'block text-sm font-medium leading-6 text-left',
                                      ]"
                                    >
                                      Email
                                    </label>
                                    <InputText
                                      id="email"
                                      v-model="newUser.email"
                                      class="w-full"
                                      placeholder="your@email.here"
                                      @blur="isEmailValid = emailValidation(newUser.email)"
                                    />
                                  </div>
                                  <div class="sm:col-span-2">
                                    <label
                                      for="phoneNumber"
                                      :class="[
                                        isPhoneValid === false ? '!text-red-500' : 'text-gray-900',
                                        'block text-sm font-medium leading-6 text-left',
                                      ]"
                                    >
                                      Phone number
                                    </label>
                                    <InputMask
                                      id="phoneNumber"
                                      v-model="newUser.phoneNumber"
                                      mask="999-999999"
                                      placeholder="3xx-xxxxxx"
                                      class="w-full"
                                      @blur="isPhoneValid = phoneValidation(newUser.phoneNumber)"
                                    />
                                  </div>
                                  <div class="sm:col-span-2">
                                    <label
                                      for="gender"
                                      class="block text-sm font-medium leading-6 text-left text-gray-900"
                                    >
                                      Gender
                                    </label>
                                    <Dropdown
                                      id="gender"
                                      v-model="newUser.gender"
                                      :options="['Male', 'Female']"
                                      placeholder="Select gender"
                                      class="w-full text-left"
                                    />
                                  </div>
                                </div>
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
                                icon-pos="right"
                                :disabled="!userDataFilled"
                                @click="nextCallback"
                              />
                            </div>
                          </div>
                        </template>
                      </StepperPanel>
                      <StepperPanel>
                        <template #content="{ prevCallback }">
                          <div class="flex flex-col">
                            <div
                              class="lg:h-[23rem] flex items-start justify-center flex-auto font-medium border-2 border-dashed rounded-md border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900"
                            >
                              <div class="flex flex-col p-4">
                                <div class="mb-3 text-xl font-semibold text-center">
                                  Select paymet method
                                </div>
                                <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                                  <div class="flex flex-col">
                                    <label class="block text-sm font-medium leading-6 text-left text-gray-900">
                                      Payment method
                                    </label>
                                    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                      <div
                                        v-for="method in paymentMethods"
                                        :key="method.id"
                                        :class="[
                                          newUser.paymentMethod === method.value
                                            ? 'border-primary-300'
                                            : 'border-gray-300',
                                          'relative flex items-center px-6 py-5 space-x-3 bg-white border  rounded-lg shadow-sm focus-within:ring-2 hover:border-primary-400 cursor-pointer',
                                        ]"
                                      >
                                        <div class="flex-shrink-0">
                                          <NuxtImg
                                            class="w-10 h-10 rounded-full"
                                            :src="method.logo"
                                            alt=""
                                          />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                          <a
                                            class="focus:outline-none"
                                            @click="newUser.paymentMethod = method.value"
                                          >
                                            <span
                                              class="absolute inset-0"
                                              aria-hidden="true"
                                            />
                                            <p class="text-sm font-medium text-gray-900">{{ method.value }}</p>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      for="firstName"
                                      class="block text-sm font-medium leading-6 text-left text-gray-900"
                                    >
                                      Notes
                                    </label>
                                    <Textarea
                                      v-model="newUser.notes"
                                      auto-resize
                                      rows="10"
                                      cols="30"
                                      class="w-full"
                                    />
                                  </div>
                                </div>
                              </div>
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
                              icon-pos="right"
                              @click="handleCreate"
                            >
                              Upload
                            </Button>
                          </div>
                        </template>
                      </StepperPanel>
                    </Stepper>
                  </div>
                </div>
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </div>
</template>
