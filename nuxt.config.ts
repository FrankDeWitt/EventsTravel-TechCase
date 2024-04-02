import * as path from 'path'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/device', 'nuxt-primevue', 'nuxt-headlessui'],
  primevue: {
    options: {
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, './presets/custom/') },
    components: {
      include: [
        'Button',
        'Calendar',
        'Column',
        'ColumnGroup',
        'DataTable',
        'Dropdown',
        'InputMask',
        'InputNumber',
        'InputText',
        'Listbox',
        'Rating',
        'Row',
        'Skeleton',
        'Slider',
        'Stepper',
        'StepperPanel',
        'Textarea',
        'Panel',
      ],
    },
    composables: {
      exclude: '*',
    },
    directives: {
      exclude: '*',
    },
  },
  css: ['~/assets/css/base.css'],
  headlessui: {
    prefix: 'Headless',
  },
  devtools: { enabled: true },
})
