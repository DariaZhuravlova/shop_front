// plugins/apiConfig.ts
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const envConfig = {
    apiUrl: config.public.apiUrl,
  };

  nuxtApp.provide('envConfig', envConfig);
});
