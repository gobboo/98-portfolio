// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	css: ['98.css/dist/98.css'],
	runtimeConfig: {
    MONGO_URI: '',
    JWT_SECRET: ''
  },
	vite: { ssr: { noExternal: ["moment"], } }
})
