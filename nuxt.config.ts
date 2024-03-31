import * as path from 'path'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-primevue', 'nuxt-headlessui'],
  primevue: {
    options: {
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, './presets/lara/') }, //import and apply preset
  },
  css: ['~/assets/css/base.css'],
  headlessui: {
    prefix: 'Headless',
  },
  devtools: { enabled: true },
})
