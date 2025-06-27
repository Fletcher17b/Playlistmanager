/*
 * main.js
 * Entry point for the Playlist Manager Vue application.
 * - Sets up the Vue app, router, store, and BootstrapVue3.
 * - Mounts the app to the DOM.
 * - Initializes the theme from the store.
 */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Import Bootstrap and BootstrapVue3 styles
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import BootstrapVue3 from "bootstrap-vue-3";

// Create the Vue application instance
const app = createApp(App);

// Register the Vuex store for state management
app.use(store);
// Register the Vue Router for page navigation
app.use(router);
// Register BootstrapVue3 for UI components
app.use(BootstrapVue3);

// Initialize the theme (e.g., light/dark mode) from the store
store.dispatch("initializeTheme");

// Mount the app to the #app element in public/index.html
app.mount("#app");
