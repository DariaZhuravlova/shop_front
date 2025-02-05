// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
    devtools: { enabled: false },
    css: ["~/assets/scss/main.scss"],
    build: {
        transpile: ["vuetify"],
    },
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook("vite:extendConfig", (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }));
            });
        },
        //...
        "@pinia/nuxt",
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    plugins: ['~/plugins/envConfig.ts', '~/plugins/socket.client.ts'],
    runtimeConfig: {
        public: {
            apiUrl: process.env.NODE_ENV === 'production' ? 'https://shop-back-mh7t.onrender.com' : 'http://localhost:3001',
            //   apiUrl: process.env.NODE_ENV === 'production' ? 'https://shop-back-mh7t.onrender.com' : 'https://shop-back-mh7t.onrender.com',

        },
    },
});
