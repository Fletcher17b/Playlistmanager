import { createStore } from "vuex";
import playlists from "./playlists";

const THEME_KEY = "app-theme";

export default createStore({
  state: {
    theme: localStorage.getItem(THEME_KEY) || "light", // default light
  },
  modules: {
    playlists,
  },
  state: {},
  getters: {
    isDarkTheme: (state) => state.theme === "dark",
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem(THEME_KEY, theme);
      document.body.classList.toggle("dark-mode", theme === "dark");
    },
  },
  actions: {
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === "light" ? "dark" : "light";
      commit("setTheme", newTheme);
    },
    initializeTheme({ commit, state }) {
      // Ensure body class matches stored theme on app start
      document.body.classList.toggle("dark-mode", state.theme === "dark");
    },
  },
});
