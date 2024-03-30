import * as path from 'path'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'nuxt-primevue'],
  primevue: {
    options: {
      unstyled: true,
    },
    importPT: { from: path.resolve(__dirname, './presets/lara/') }, //import and apply preset
  },
  css: ['~/assets/css/base.css'],
  devtools: { enabled: true },
})
