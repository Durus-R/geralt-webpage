import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Analytics} from "firebase/analytics"

declare module '@vue/runtime-core' {

  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
    $app: FirebaseApp;
    $analytics: Analytics
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' });

const firebaseConfig = { //TODO make apiKey private
  apiKey: "AIzaSyBvCYVmpQx4KV_DvLQ4frMUQtDV9wJPrn8",
  authDomain: "geralt-counter.firebaseapp.com",
  projectId: "geralt-counter",
  storageBucket: "geralt-counter.appspot.com",
  messagingSenderId: "381257378712",
  appId: "1:381257378712:web:85a48cbe92d45084a359ed",
  measurementId: "G-V1B02WSK7B"
};

// Initialize Firebase
const fb_app = initializeApp(firebaseConfig);
const analytics = getAnalytics(fb_app);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  app.config.globalProperties.$app=fb_app;
  app.config.globalProperties.$analytics=analytics;
});

export { api };
