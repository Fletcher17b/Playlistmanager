<template>
  <h1> TEXT</h1>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold">{{ playlist.name }}</h1>
        <p class="text-gray-500">{{ playlist.description }}</p>
      </div>
      <img
        :src="playlist.thumbnail"
        alt="Playlist Cover"
        class="w-24 h-24 object-cover rounded-lg"
      />
    </div>

    <SearchBar v-model="searchQuery" />

    <div class="mt-4">
      <SongItem
        v-for="(song, index) in filteredSongs"
        :key="song.id"
        :song="song"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import SearchBar from "../components/SearchBar.vue";
import SongItem from "../components/SongItem.vue";

export default {
  name: "Playlist",
  components: {
    SearchBar,
    SongItem,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    ...mapState("playlists", ["playlists"]),
    ...mapGetters("songs", ["getSongsByPlaylistId"]),
    playlist() {
      const id = this.$route.params.id;
      return this.playlists.find((p) => p.id === id) || {};
    },
    songs() {
      return this.getSongsByPlaylistId(this.$route.params.id);
    },
    filteredSongs() {
      if (!this.searchQuery.trim()) return this.songs;
      const q = this.searchQuery.toLowerCase();
      return this.songs.filter(
        (song) =>
          song.title.toLowerCase().includes(q) ||
          song.artist.toLowerCase().includes(q) ||
          song.album.toLowerCase().includes(q)
      );
    },
  },
  created() {
    // Optional: fetch playlist or songs if not already loaded
    if (!this.playlists.length) {
      this.fetchPlaylists(); // from Vuex action
    }
    this.fetchSongs(this.$route.params.id);
  },
  methods: {
    ...mapActions("playlists", ["fetchPlaylists"]),
    ...mapActions("songs", ["fetchSongs"]),
  },
};
</script>

<style scoped>
/* Add your styles or leave Tailwind to handle layout */
</style>
