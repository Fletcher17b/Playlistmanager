<!--
  Dashboard.vue
  Main dashboard view for the Playlist Manager application.
  
  Features:
  - Displays all user playlists in a responsive grid
  - Allows creating new playlists via modal
  - Supports editing and deleting existing playlists
  - Integrates with Vuex store for state management
  
  Components used:
  - Navbar: Navigation component
  - PlaylistCard: Individual playlist display cards
  - AddPlaylistModal: Modal for creating/editing playlists
-->

<template>
  <!-- Navigation bar at the top -->
  <Navbar></Navbar>
  
  <div class="dashboard">
    <!-- Header section with title and create button -->
    <div class="dashboard-header">
      <h1>Your Playlists</h1>
      <button class="add-btn" @click="openCreateModal">+ New Playlist</button>
    </div>

    <!-- <div class="p-6 max-w-6xl mx-auto wrapper-div">
      <h1 class="text-3xl font-bold mb-6">Your Playlists</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <PlaylistCard v-for="playlist in playlists" :key="playlist.id" :playlist="playlist" />
      </div>
    </div> -->
    <div class="playlist-grid">
      <PlaylistCard
        v-for="playlist in playlists"
        :key="playlist.id"
        :playlist="playlist"
        @edit="openEditModal"
        @delete="handleDelete"
      />
    </div>

    <!-- Modal for creating/editing playlists (conditionally rendered) -->
    <AddPlaylistModal
      v-if="showModal"
      :editingPlaylist="editing"
      @save="handleSave"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PlaylistCard from "../components/PlaylistCard.vue";
import Navbar from "../components/Navbar.vue";
import AddPlaylistModal from "../components/AddPlaylistModal.vue";

export default {
  name: "Dashboard",
  
  // Register child components
  components: {
    PlaylistCard,
    Navbar,
    AddPlaylistModal,
  },
  
  // Component's local data
  data() {
    return {
      showModal: false, // Controls modal visibility
      editing: null, // Holds the playlist being edited (null = creating new)
    };
  },
  
  // Computed properties (reactive data derived from store)
  computed: {
    // Map Vuex getters to component properties
    ...mapGetters("playlists", ["allPlaylists"]),
    
    // Alias for better readability
    playlists() {
      return this.allPlaylists;
    },
  },
  
  // Component methods
  methods: {
    // Map Vuex actions to component methods
    ...mapActions("playlists", [
      "fetchPlaylists",
      "createPlaylist",
      "updatePlaylist",
      "deletePlaylist",
    ]),
    
    /**
     * Opens the modal for creating a new playlist
     */
    openCreateModal() {
      this.editing = null; // No playlist being edited
      this.showModal = true;
    },
    
    /**
     * Opens the modal for editing an existing playlist
     * @param {Object} playlist - The playlist object to edit
     */
    openEditModal(playlist) {
      this.editing = playlist; // Set the playlist being edited
      this.showModal = true;
    },
    
    /**
     * Closes the modal and resets editing state
     */
    closeModal() {
      this.showModal = false;
      this.editing = null;
    },
    
    /**
     * Handles saving a playlist (create or update)
     * @param {Object} playlist - The playlist data to save
     */
    async handleSave(playlist) {
      try {
        if (this.editing) {
          // Update existing playlist
          await this.updatePlaylist({
            id: this.editing.id,
            playlistData: playlist,
          });
        } else {
          // Create new playlist
          await this.createPlaylist(playlist);
        }
        this.closeModal();
      } catch (error) {
        console.error("Error saving playlist:", error);
        // TODO: Add user-friendly error notification (toast)
      }
    },
    
    /**
     * Handles deleting a playlist
     * @param {number|string} playlistId - ID of the playlist to delete
     */
    async handleDelete(playlistId) {
      try {
        await this.deletePlaylist(playlistId);
      } catch (error) {
        console.error("Error deleting playlist:", error);
        // TODO: Add user-friendly error notification (toast)
      }
    },
  },
  
  // Lifecycle hook: called when component is mounted
  async mounted() {
    // Fetch playlists from the API when component loads
    await this.fetchPlaylists();
  },
};
</script>

<style scoped>
/* Main dashboard container */
.dashboard {
  margin-top: 5vh;
  padding: 1rem;
  max-width: 100%;
}

/* Header section styling */
.dashboard-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.dashboard-header h1 {
  font-size: 1.5rem;
  margin: 0;
}

/* Create playlist button styling */
.add-btn {
  background: #333;
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-btn:hover {
  background: #111;
}

/* Responsive grid for playlist cards */
.playlist-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet breakpoint */
@media (min-width: 600px) {
  .dashboard-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .playlist-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop breakpoint */
@media (min-width: 900px) {
  .playlist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Legacy wrapper styling (commented out in template) */
.wrapper-div {
  padding-top: 0;
}

@media (min-width: 768px) {
  .wrapper-div {
    padding-top: 7vh;
  }
}
</style>
