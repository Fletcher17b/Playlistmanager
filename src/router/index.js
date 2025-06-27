/*
 * router/index.js
 * Configures Vue Router for the Playlist Manager app.
 * Defines routes for Home, Dashboard, and Playlist Detail views.
 */

import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Playlist from "../views/Playlist.vue";
import Dashboard from "@/views/Dashboard.vue";

// Define the application's routes
const routes = [
  { path: "/", name: "Home", component: Home }, // Home page
  { path: "/dashboard", name: "Dashboard", component: Dashboard }, // User dashboard
  { path: "/playlist/:id", name: "Playlist", component: Playlist }, // Playlist detail page (dynamic by ID)
];

// Create and export the router instance
export default createRouter({
  history: createWebHistory(), // Uses HTML5 history mode
  routes,
});
