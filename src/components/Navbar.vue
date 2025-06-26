<template>
  <nav class="navbar1">
    <ul class="nav-list">
      <li class="nav-item" @click="goHome">Home</li>
      <li class="nav-item" @click="goDashboard">Dashboard</li>
      <li class="nav-item toggle-theme" @click="toggleTheme" role="button" tabindex="0">
        <span v-if="isDark">🌞 Light Mode</span>
        <span v-else>🌙 Dark Mode</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapGetters,mapActions} from "vuex";

export default {
  name: 'Navbar',
  methods: {
    goHome() {
      this.$router.push('/');
    },
    goDashboard() {
      this.$router.push('/dashboard');
    },
    goSettings() {
      this.$router.push('/settings');
    },
  },
  computed: {
    ...mapGetters(["isDarkTheme"]),
    isDark() {
      return this.isDarkTheme;
    },
  },
  methods: {
    ...mapActions(["toggleTheme"]),
  },
};
</script>

<style scoped>
.navbar1 {
  height: 0.5vh;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #222;
  color: #fff;
  box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  margin-bottom:0;
}

.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-item {
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: #1e90ff;
}

@media (min-width: 768px) {
  .navbar1 {
    top: 0;
    bottom: auto;
    margin-bottom: 7vh;
  }
}
</style>
