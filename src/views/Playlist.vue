<!--
  Playlist.vue
  Detailed view for displaying and managing a single playlist.
  
  Features:
  - Displays playlist information (name, description, cover image)
  - Shows all songs in the playlist with search functionality
  - Supports drag-and-drop reordering of songs
  - Allows adding new songs via modal
  - Handles song deletion and reordering operations
  - Responsive design for different screen sizes
  
  Route Parameters:
  - id: Playlist ID from the URL route
  
  Components used:
  - Navbar: Navigation component
  - SearchBar: Search input for filtering songs
  - DraggableSongList: Sortable list of songs with drag-and-drop
  - AddSongModal: Modal for adding new songs
  - LoadingSpinner: Loading indicator
-->

<template>
  <!-- Navigation bar at the top -->
  <Navbar></Navbar>

  <div class="wrapper-div">
    <div class="playlist-detail">
      <!-- Playlist header with cover image and information -->
      <div class="header">
        <img v-if="playlist.cover" :src="playlist.cover" class="cover" />
        <div class="info">
          <h1 class="title">{{ playlist.name || "Playlist" }}</h1>
          <p class="description">
            {{ playlist.description || "No description" }}
          </p>
          <p class="meta">
            {{ songs.length }} songs • Created
            {{ playlist.createdAt || "recently" }}
          </p>
        </div>
      </div>

      <!-- Songs section header with search and add button -->
      <div class="songs-header">
        <SearchBar v-model="searchQuery" />
        <button class="add-song-btn" @click="openAddSongModal">
          + Add Song
        </button>
      </div>

      <!-- Songs list container -->
      <div class="songs-wrapper">
        <div class="songs-card">
          <!-- Loading state -->
          <div v-if="loading" class="loading">
            <LoadingSpinner />
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="error">
            {{ error }}
          </div>

          <!-- Songs list with drag-and-drop functionality -->
          <div v-else-if="filteredSongs.length" class="drag-instructions">
            <p class="drag-hint">💡 Drag and drop songs to reorder them</p>
            <DraggableSongList
              :songs="filteredSongs"
              :playlistId="playlistId"
              @delete="handleDeleteSong"
              @reorder="handleReorderSongs"
            />
          </div>

          <!-- Empty state when no songs found -->
          <div v-else class="no-songs">No songs found.</div>
        </div>
      </div>
    </div>

    <!-- Modal for adding new songs -->
    <AddSongModal
      v-if="showAddSongModal"
      :playlistId="playlistId"
      @save="handleAddSong"
      @close="closeAddSongModal"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Navbar from "../components/Navbar.vue";
import SearchBar from "../components/SearchBar.vue";
import SongItem from "../components/SongItem.vue";
import DraggableSongList from "../components/DraggableSongList.vue";
import AddSongModal from "../components/AddSongModal.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  name: "Playlist",
  
  // Register child components
  components: {
    Navbar,
    SearchBar,
    SongItem,
    DraggableSongList,
    AddSongModal,
    LoadingSpinner,
  },
  
  // Component's local data
  data() {
    return {
      searchQuery: "", // Search term for filtering songs
      showAddSongModal: false, // Controls add song modal visibility
    };
  },
  
  // Computed properties (reactive data derived from store and route)
  computed: {
    // Map Vuex state and getters to component properties
    ...mapState("playlists", ["playlists"]),
    ...mapGetters("songs", ["getSongsByPlaylistId"]),

    /**
     * Gets the playlist ID from the route parameters
     * @returns {string} Playlist ID from URL
     */
    playlistId() {
      return this.$route.params.id;
    },

    /**
     * Finds the current playlist from the playlists array
     * @returns {Object} Playlist object or empty object if not found
     */
    playlist() {
      return this.playlists.find((p) => p.id === this.playlistId) || {};
    },
    
    /**
     * Gets all songs for the current playlist
     * @returns {Array} Array of song objects
     */
    songs() {
      return this.getSongsByPlaylistId(this.playlistId);
    },
    
    /**
     * Filters songs based on search query
     * Searches in title, artist, and album fields
     * @returns {Array} Filtered array of songs
     */
    filteredSongs() {
      if (!this.searchQuery.trim()) return this.songs;

      const q = this.searchQuery.toLowerCase();
      return this.songs.filter((song) => {
        return (
          (song.title && song.title.toLowerCase().includes(q)) ||
          (song.artist && song.artist.toLowerCase().includes(q)) ||
          (song.album && song.album.toLowerCase().includes(q))
        );
      });
    },

    /**
     * Gets loading state from the songs store module
     * @returns {boolean} Loading state
     */
    loading() {
      return this.$store.state.songs.loading;
    },

    /**
     * Gets error state from the songs store module
     * @returns {string|null} Error message or null
     */
    error() {
      return this.$store.state.songs.error;
    },
  },
  
  // Lifecycle hook: called when component is created
  created() {
    // Fetch playlists if not already loaded
    if (!this.playlists.length) {
      this.fetchPlaylists();
    }
    // Fetch songs for the current playlist
    this.fetchSongs(this.playlistId);
  },
  
  // Component methods
  methods: {
    // Map Vuex actions to component methods
    ...mapActions("playlists", ["fetchPlaylists"]),
    ...mapActions("songs", [
      "fetchSongs",
      "createSong",
      "deleteSong",
      "reorderSongs",
    ]),

    /**
     * Opens the modal for adding a new song
     */
    openAddSongModal() {
      this.showAddSongModal = true;
    },

    /**
     * Closes the add song modal
     */
    closeAddSongModal() {
      this.showAddSongModal = false;
    },

    /**
     * Handles adding a new song to the playlist
     * @param {Object} songData - Song data from the modal
     */
    async handleAddSong(songData) {
      try {
        await this.createSong(songData);
        this.closeAddSongModal();
      } catch (error) {
        console.error("Error adding song:", error);
        // TODO: Add user-friendly error notification
      }
    },

    /**
     * Handles deleting a song from the playlist
     * @param {number|string} songId - ID of the song to delete
     */
    async handleDeleteSong(songId) {
      try {
        await this.deleteSong(songId);
      } catch (error) {
        console.error("Error deleting song:", error);
        // TODO: Add user-friendly error notification
      }
    },

    /**
     * Handles reordering songs in the playlist
     * @param {Object} payload - Reorder payload
     * @param {number|string} payload.playlistId - Playlist ID
     * @param {Array<number|string>} payload.songIds - New order of song IDs
     */
    async handleReorderSongs({ playlistId, songIds }) {
      try {
        await this.reorderSongs({ playlistId, songIds });
      } catch (error) {
        console.error("Error reordering songs:", error);
        // TODO: Add user-friendly error notification
      }
    },
  },
};
</script>

<style scoped>
/* Main wrapper with top margin for navbar */
.wrapper-div {
  margin-top: 5vh;
}

/* Main playlist detail container */
.playlist-detail {
  padding: 1rem;
  max-width: 800px;
  margin: auto;
  font-family: sans-serif;
}

/* Playlist header section */
.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Playlist cover image styling */
.cover {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

/* Playlist information section */
.info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0;
}

.description {
  color: #666;
  font-size: 0.95rem;
}

.meta {
  font-size: 0.9rem;
  color: #999;
}

/* Songs section header with search and add button */
.songs-header {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

/* Add song button styling */
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

/* Drag and drop instructions */
.drag-instructions {
  margin-bottom: 1rem;
}

.drag-hint {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
  font-style: italic;
}

/* Loading and error states */
.loading,
.error {
  text-align: center;
  margin-top: 2rem;
}

.error {
  color: #d32f2f;
}

/* Empty state when no songs */
.no-songs {
  text-align: center;
  color: #777;
  margin-top: 1rem;
}

/* Responsive design for larger screens */
@media (min-width: 600px) {
  .header {
    flex-direction: row;
    align-items: center;
  }

  .cover {
    width: 250px;
    height: 250px;
  }

  .info {
    flex: 1;
    padding-left: 1.5rem;
  }
}

/* Responsive design for mobile screens */
@media (max-width: 600px) {
  .songs-header {
    flex-direction: column;
    align-items: stretch;
  }

  .add-song-btn {
    order: -1; /* Move button to top on mobile */
  }
}
</style>
