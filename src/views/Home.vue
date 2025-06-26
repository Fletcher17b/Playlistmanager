<template>
  <Navbar></Navbar>
  <div class="homepage">
    <h1>Welcome to My Website</h1>
    <p>This is a simple homepage template.</p>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'HomePage',
  components: {
    Navbar,
  },
  // Basic component definition to prevent errors
  data() {
    return {
      // Empty data object (could add properties here later)
    }
  }
}
</script>

<style scoped>
.homepage {
  padding: 20px;
  text-align: center;
}
</style>