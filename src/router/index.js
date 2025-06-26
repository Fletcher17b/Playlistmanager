import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Playlist from '../views/Playlist.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/playlist/:id', name: 'Playlist', component: Playlist }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
