<script lang="ts" setup>
import { PaymentMethodValue } from '@/types'
import type { Travel, User, PaymentMethod } from '@/types'
import { GenderValue } from '@/types'

useHead({
  title: 'Manage Bookings',
})

const { emailValidation, phoneValidation, dateOfBirthValidation } = useValidations()

const { users, pending, refresh } = useGetUsers()

const travels = useState<Travel[]>('travels')

const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    value: PaymentMethodValue.Paypal,
    logo: 'https://w7.pngwing.com/pngs/720/939/png-transparent-paypal-computer-icons-logo-paypal-blue-angle-service-thumbnail.png',
  },
  { id: 2, value: PaymentMethodValue.Revolut, logo: 'https://asset.brandfetch.io/idfFwYU4-9/idtPX9K4r8.png' },
  {
    id: 3,
    value: PaymentMethodValue.BankTransfer,
    logo: 'https://www.freeiconspng.com/thumbs/bank-icon/bank-icon-5.png',
  },
]

const active = ref(0)
const showingModal = ref(false)
const isEmailValid = ref<boolean | undefined>(undefined)
const isPhoneValid = ref<boolean | undefined>(undefined)
const isBirthdateValid = ref<boolean | undefined>(undefined)

const newUser: User = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  gender: GenderValue.Male,
  paymentMethod: PaymentMethodValue.Paypal,
  travelId: null,
  notes: '',
})

const selectedTravel = computed(() => {
  const foundTravel = travels.value.find((t) => t.id === newUser.travelId)
  return foundTravel ? foundTravel.picture : null
})

const userDataFilled = computed(() => {
  return (
    newUser.firstName !== '' &&
    newUser.lastName !== '' &&
    isEmailValid.value === true &&
    isPhoneValid.value === true &&
    isBirthdateValid.value === true
  )
})

const resetNewUserTemplate = () => {
  active.value = 0
  newUser.firstName = ''
  newUser.lastName = ''
  newUser.email = ''
  newUser.phoneNumber = ''
  newUser.birthDate = ''
  newUser.gender = GenderValue.Male
  newUser.paymentMethod = PaymentMethodValue.Paypal
  newUser.travelId = null
  newUser.notes = ''
}

const handleCreate = async () => {
  showingModal.value = false
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
      @create-user="showingModal = true"
    />
    <BaseModal
      :showing="showingModal"
      size="lg"
      @close="(showingModal = false), resetNewUserTemplate()"
    >
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
            :pt="{ panelContainer: { class: 'p-0 lg:p-4' } }"
          >
            <StepperPanel>
              <template #content="{ nextCallback }">
                <div class="flex flex-col">
                  <div
                    class="lg:h-[23rem] lg:max-h-[23rem] flex items-start justify-center flex-auto border-2 border-dashed rounded-md"
                  >
                    <div class="flex flex-col p-4">
                      <div class="mb-3 text-xl font-semibold text-center">Select the travel</div>
                      <div class="grid grid-cols-2 gap-8">
                        <Listbox
                          v-model="newUser.travelId"
                          :options="travels"
                          option-label="name"
                          option-value="id"
                          :pt="{ list: { class: 'h-56' } }"
                          filter
                          class="col-span-2 md:col-span-1"
                        />
                        <NuxtImg
                          class="hidden md:block aspect-[3/2] object-cover w-full h-full col-span-1 rounded-2xl"
                          :src="
                            newUser.travelId && selectedTravel !== null
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
                    class="lg:h-[23rem] flex items-start justify-center flex-auto border-2 border-dashed rounded-md w-full"
                  >
                    <div class="flex flex-col w-full p-4">
                      <div class="mb-3 text-xl font-semibold text-center">Fill the user information</div>
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
                        <div class="text-left sm:col-span-2">
                          <label
                            for="age"
                            :class="[
                              isBirthdateValid === false ? '!text-red-500' : 'text-gray-900',
                              'block text-sm font-medium leading-6 text-left',
                            ]"
                          >
                            Birthdate
                          </label>
                          <InputMask
                            id="age"
                            v-model="newUser.birthDate"
                            mask="99/99/9999"
                            placeholder="dd/mm/yyyy"
                            class="w-full"
                            @blur="isBirthdateValid = dateOfBirthValidation(newUser.birthDate)"
                          />
                          <small
                            v-if="isBirthdateValid === false"
                            id="age-help"
                            class="text-red-500"
                          >
                            Invalid birthdate format
                          </small>
                        </div>
                        <div class="text-left sm:col-span-2">
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
                          <small
                            v-if="isEmailValid === false"
                            id="email-help"
                            class="text-red-500"
                          >
                            Invalid email format
                          </small>
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
                            placeholder="xxx-xxxxxx"
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
                      @click="prevCallback"
                    />
                    <Button
                      label="Next"
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
                  <div class="lg:h-[23rem] flex items-start justify-center flex-auto border-2 border-dashed rounded-md">
                    <div class="flex flex-col w-full p-4">
                      <div class="mb-3 text-xl font-semibold text-center">Select paymet method</div>
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
                                newUser.paymentMethod === method.value ? 'border-primary-300' : 'border-gray-300',
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
                            rows="10"
                            cols="30"
                            class="w-full resize-none"
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
                    @click="prevCallback"
                  />
                  <Button
                    label="Upload"
                    @click="handleCreate"
                  />
                </div>
              </template>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
