<template>
  <div class="playlist-detail">
    <!-- Header: Playlist Thumbnail and Info -->
    <div class="playlist-header">
      <img
        :src="playlist.thumbnail"
        alt="Playlist Thumbnail"
        class="playlist-thumb"
      />
      <div class="playlist-info">
        <h1 class="playlist-title">{{ playlist.name }}</h1>
        <p class="playlist-description">{{ playlist.description }}</p>
        <p class="playlist-created">Created: {{ formattedDate }}</p>
      </div>
    </div>

    <!-- Song List with Search -->
    <div class="playlist-songs">
      <div class="songs-header">
        <SearchBar v-model="searchQuery" />
        <button class="add-song-btn" @click="openAddSongModal">
          + Add Song
        </button>
      </div>

      <div v-if="loading" class="loading">
        <LoadingSpinner />
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else-if="filteredSongs.length">
        <SongItem
          v-for="song in filteredSongs"
          :key="song.id"
          :song="song"
          @delete="handleDeleteSong"
        />
      </div>

      <div v-else class="no-songs">No songs found.</div>
    </div>

    <!-- Add Song Modal -->
    <AddSongModal
      v-if="showAddSongModal"
      :playlistId="playlistId"
      @save="handleAddSong"
      @close="closeAddSongModal"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SongItem from "../components/SongItem.vue";
import SearchBar from "../components/SearchBar.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import AddSongModal from "../components/AddSongModal.vue";

export default {
  name: "PlaylistDetail",
  components: {
    SongItem,
    SearchBar,
    LoadingSpinner,
    AddSongModal,
  },
  data() {
    return {
      searchQuery: "",
      showAddSongModal: false,
    };
  },
  computed: {
    ...mapGetters("playlists", ["getPlaylistById"]),
    ...mapGetters("songs", ["getSongsByPlaylistId"]),

    playlistId() {
      return this.$route.params.id;
    },

    playlist() {
      return (
        this.getPlaylistById(this.playlistId) || {
          name: "Playlist not found",
          description: "",
          thumbnail: "",
          created_at: "",
        }
      );
    },

    songs() {
      return this.getSongsByPlaylistId(this.playlistId);
    },

    filteredSongs() {
      if (!this.searchQuery.trim()) return this.songs;
      const query = this.searchQuery.toLowerCase();
      return this.songs.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query)
      );
    },

    formattedDate() {
      if (!this.playlist.created_at) return "";
      return new Date(this.playlist.created_at).toLocaleDateString();
    },

    loading() {
      return this.$store.state.songs.loading;
    },

    error() {
      return this.$store.state.songs.error;
    },
  },

  methods: {
    ...mapActions("songs", [
      "fetchSongsByPlaylist",
      "deleteSong",
      "createSong",
    ]),

    async handleDeleteSong(songId) {
      try {
        await this.deleteSong(songId);
      } catch (error) {
        console.error("Error deleting song:", error);
      }
    },

    openAddSongModal() {
      this.showAddSongModal = true;
    },

    closeAddSongModal() {
      this.showAddSongModal = false;
    },

    async handleAddSong(songData) {
      try {
        await this.createSong(songData);
        this.closeAddSongModal();
      } catch (error) {
        console.error("Error adding song:", error);
      }
    },
  },

  async mounted() {
    await this.fetchSongsByPlaylist(this.playlistId);
  },
};
</script>

<style scoped>
.playlist-detail {
  padding: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

/* Header styles */
.playlist-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.playlist-thumb {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.playlist-info {
  text-align: center;
}

.playlist-title {
  font-size: 1.8rem;
  margin: 0.5rem 0;
}

.playlist-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.playlist-created {
  font-size: 0.9rem;
  color: #888;
}

/* Song list styles */
.playlist-songs {
  margin-top: 1.5rem;
}

.songs-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.add-song-btn {
  background: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.add-song-btn:hover {
  background: #0056b3;
}

.search-bar {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.song-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

.song-item:last-child {
  border-bottom: none;
}

.song-title {
  flex: 2;
  font-weight: 600;
}

.song-artist {
  flex: 2;
  text-align: center;
  color: #666;
}

.song-duration {
  flex: 1;
  text-align: right;
  color: #999;
}

.no-songs {
  text-align: center;
  color: #777;
  margin-top: 1rem;
}

.loading,
.error {
  text-align: center;
  margin-top: 2rem;
}

.error {
  color: #d32f2f;
}

@media (max-width: 600px) {
  .songs-header {
    flex-direction: column;
    align-items: stretch;
  }

  .add-song-btn {
    order: -1;
  }
}
</style>
