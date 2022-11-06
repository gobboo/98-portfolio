// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	css: ['98.css/dist/98.css'],
	runtimeConfig: {
    mongoUri: 'mongodb://localhost:27017/portfolio',
    jwtSecret: 'cats&dogs'
  },
	vite: { ssr: { noExternal: ["moment"], } }
})
