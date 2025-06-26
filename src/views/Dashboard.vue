<template>
  <Navbar></Navbar>
  <div class="dashboard">
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
    
    <AddPlaylistModal v-if="showModal" :editingPlaylist="editing"  @save="handleSave" @close="closeModal"/>


  </div>

</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import PlaylistCard from '../components/PlaylistCard.vue';
import Navbar from '../components/Navbar.vue';
import AddPlaylistModal from '../components/AddPlaylistModal.vue'

export default {
  name: 'Dashboard',
  components: {
    PlaylistCard,
    Navbar,
    AddPlaylistModal,
  },
  data() {
    return {
      showModal: false,
      editing: null, // holds the playlist being edited or null
    };
  },
  computed: {
    ...mapGetters('playlists', ['allPlaylists']),
    playlists() {
      return this.allPlaylists;
    }
  },
  methods: {
    ...mapActions("playlists", ["fetchPlaylists", "createPlaylist", "updatePlaylist", "deletePlaylist"]),
    openCreateModal() {
      this.editing = null;
      this.showModal = true;
    },
    openEditModal(playlist) {
      this.editing = playlist;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editing = null;
    },
    async handleSave(playlist) {
      try {
        if (this.editing) {
          await this.updatePlaylist({ id: this.editing.id, playlistData: playlist });
        } else {
          await this.createPlaylist(playlist);
        }
        this.closeModal();
      } catch (error) {
        console.error('Error saving playlist:', error);
        // You could add a toast notification here
      }
    },
    async handleDelete(playlistId) {
      try {
        await this.deletePlaylist(playlistId);
      } catch (error) {
        console.error('Error deleting playlist:', error);
        // You could add a toast notification here
      }
    },
  },
  async mounted() {
    // Fetch playlists when component mounts
    await this.fetchPlaylists();
  },
};
</script>

<style scoped>
.dashboard {
  margin-top: 5vh;
  padding: 1rem;
  max-width: 100%;
}

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

.playlist-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

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

@media (min-width: 900px) {
  .playlist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.wrapper-div {
  padding-top: 0;
}

@media (min-width: 768px) {
  .wrapper-div {
    padding-top: 7vh;
  }
}
</style>