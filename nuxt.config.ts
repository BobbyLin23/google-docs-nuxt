// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/image',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  components: [
    '~/components',
    {
      path: '~/components/editor',
      pathPrefix: false,
    },
    {
      path: '~/components/documents',
      pathPrefix: false,
    },
  ],
  pinia: {
    storesDirs: ['~/store/**'],
  },
})