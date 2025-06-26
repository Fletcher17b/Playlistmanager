<template>
  <div>
    <Navbar></Navbar>
    <div class="p-6 max-w-6xl mx-auto wrapper-div">
      <h1 class="text-3xl font-bold mb-6">Your Playlists</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <PlaylistCard v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
      </div>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import PlaylistCard from '../components/PlaylistCard.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Dashboard',
  components: {
    PlaylistCard,
    Navbar,
  },
  computed: {
    ...mapGetters('playlists', ['allPlaylists']),
    playlists() {
      return this.allPlaylists;
    }
  }
};
</script>

<style scoped>
.wrapper-div {
  padding-top: 0;
}

@media (min-width: 768px) {
  .wrapper-div {
    padding-top: 7vh;
  }
}


</style>