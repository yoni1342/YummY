// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxtjs/apollo",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt"
  ],

  googleFonts: {
    display: "swap",
    families: {
      Quicksand: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      Montserrat: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: "http://localhost:8080/v1/graphql",
      },
      authClient: {
        httpEndpoint: "http://localhost:8080/v1/graphql",
        tokenName: "auth_token",
      },
    },
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
});
