<!--
  PlaylistCard.vue
  Reusable component for displaying individual playlist information.
  
  Features:
  - Displays playlist thumbnail, title, description, and metadata
  - Handles click navigation to playlist detail page
  - Provides edit and delete actions
  - Responsive design with hover effects
  
  Props:
  - playlist: Object containing playlist data (id, name, description, etc.)
  
  Events:
  - edit: Emitted when edit button is clicked (passes playlist object)
  - delete: Emitted when delete button is clicked (passes playlist ID)
-->

<template>
  <div class="playlist-card" style="margin: 2vh">
    <!-- Clickable content area for navigation -->
    <div class="playlist-content" @click="goToPlaylist">
      <!-- Playlist cover image -->
      <img
        :src="playlist.thumbnail"
        class="playlist-image"
        alt="Playlist cover"
      />
      
      <!-- Playlist information section -->
      <div class="playlist-info">
        <h2 class="playlist-title">{{ playlist.name }}</h2>
        <p class="playlist-description">{{ playlist.description }}</p>
        <p class="playlist-meta">
          {{ playlist.songCount }} song{{ playlist.songCount === 1 ? "" : "s" }}
          ·
          {{ formattedDate }}
        </p>
      </div>
    </div>

    <!-- Action buttons section -->
    <div class="playlist-actions">
      <button @click.stop="editPlaylist" class="action-btn edit-btn">
        ✏️ Edit
      </button>
      <button @click.stop="deletePlaylist" class="action-btn delete-btn">
        🗑️ Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistCard",
  
  // Component props (data passed from parent)
  props: {
    /**
     * Playlist object containing all playlist data
     * @type {Object}
     * @property {number|string} id - Unique playlist identifier
     * @property {string} name - Playlist name
     * @property {string} description - Playlist description
     * @property {string} thumbnail - URL to playlist cover image
     * @property {number} songCount - Number of songs in playlist
     * @property {string} created_at - Creation date (ISO string)
     */
    playlist: {
      type: Object,
      required: true
    },
  },
  
  // Computed properties (reactive data derived from props)
  computed: {
    /**
     * Formats the playlist creation date for display
     * @returns {string} Formatted date string
     */
    formattedDate() {
      return new Date(this.playlist.created_at).toLocaleDateString();
    },
  },
  
  // Component methods
  methods: {
    /**
     * Navigates to the playlist detail page
     */
    goToPlaylist() {
      this.$router.push(`/playlist/${this.playlist.id}`);
    },
    
    /**
     * Emits edit event with the playlist object
     */
    editPlaylist() {
      this.$emit("edit", this.playlist);
    },
    
    /**
     * Shows confirmation dialog and emits delete event if confirmed
     */
    deletePlaylist() {
      if (confirm(`Are you sure you want to delete "${this.playlist.name}"?`)) {
        this.$emit("delete", this.playlist.id);
      }
    },
  },
};
</script>

<style scoped>
/* Main card container */
.playlist-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  position: relative;
}

/* Hover effect for better user interaction feedback */
.playlist-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* Clickable content area */
.playlist-content {
  cursor: pointer;
}

/* Playlist cover image styling */
.playlist-image {
  width: 100%;
  height: 160px;
  object-fit: cover; /* Maintains aspect ratio while filling container */
}

/* Information section styling */
.playlist-info {
  padding: 1rem;
}

.playlist-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.playlist-description {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.playlist-meta {
  font-size: 0.8rem;
  color: #aaa;
}

/* Action buttons container */
.playlist-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
}

/* Base button styling */
.action-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.2s ease;
}

/* Edit button specific styling */
.edit-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.edit-btn:hover {
  background-color: #bbdefb;
}

/* Delete button specific styling */
.delete-btn {
  background-color: #ffebee;
  color: #d32f2f;
}

.delete-btn:hover {
  background-color: #ffcdd2;
}

/* Responsive design for larger screens */
@media (min-width: 768px) {
  .playlist-card {
    width: 50vw;
  }
}
</style>
