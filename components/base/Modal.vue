<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  showing: boolean
  size: 'sm' | 'md' | 'lg' | string
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const sizeToClassMap: Record<string, string> = {
  sm: 'lg:max-w-lg',
  md: 'w-full lg:max-w-3xl',
  lg: 'w-full lg:max-w-4xl',
}

const sizeClass = computed(() => sizeToClassMap[props.size] || '')
</script>

<template>
  <div>
    <HeadlessTransitionRoot
      as="template"
      :show="showing"
    >
      <HeadlessDialog
        as="div"
        class="relative z-50"
        @close="emit('close')"
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
                :class="[
                  'relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:p-6',
                  sizeClass,
                ]"
                class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div class="absolute top-0 right-0 block pt-4 pr-4">
                  <button
                    type="button"
                    class="text-gray-400 bg-white rounded-md hover:text-gray-500"
                    @click="emit('close')"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon
                      class="w-10 h-10 md:w-8 md:h-8"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <slot />
              </HeadlessDialogPanel>
            </HeadlessTransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </div>
</template>
