// import this after install `@mdi/font` package
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import {createVuetify} from "vuetify";

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'customTheme',
            themes: {
                customTheme: {
                    dark: false,
                    colors: {
                        primary: '#221f1f',
                        secondary: '#424242',
                        accent: '#82B1FF',
                        error: '#FF5252',
                        info: '#2196F3',
                        success: '#4CAF50',
                        warning: '#FB8C00',
                    },
                },
            },
        },
        display: {
            mobileBreakpoint: 'sm',
            thresholds: {
              xs: 0,
              sm: 340,
              md: 540,
              lg: 800,
              xl: 1280,
              xxl: 1920,
            },
          },
    });
    app.vueApp.use(vuetify);
});
