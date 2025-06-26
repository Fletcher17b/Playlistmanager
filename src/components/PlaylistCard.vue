<template>
  <div class="playlist-card" style="margin: 2vh;">
    <div class="playlist-content" @click="goToPlaylist">
      <img :src="playlist.thumbnail" class="playlist-image" alt="Playlist cover" />
      <div class="playlist-info">
        <h2 class="playlist-title">{{ playlist.name }}</h2>
        <p class="playlist-description">{{ playlist.description }}</p>
        <p class="playlist-meta">
          {{ playlist.songCount }} song{{ playlist.songCount === 1 ? '' : 's' }} ·
          {{ formattedDate }}
        </p>
      </div>
    </div>
    
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
  name: 'PlaylistCard',
  props: {
    playlist: Object,
  },
  computed: {
    formattedDate() {
      return new Date(this.playlist.created_at).toLocaleDateString();
    }
  },
  methods: {
    goToPlaylist() {
      this.$router.push(`/playlist/${this.playlist.id}`);
    },
    editPlaylist() {
      this.$emit('edit', this.playlist);
    },
    deletePlaylist() {
      if (confirm(`Are you sure you want to delete "${this.playlist.name}"?`)) {
        this.$emit('delete', this.playlist.id);
      }
    },
  },
};
</script>

<style scoped>
.playlist-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  position: relative;
}

.playlist-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.playlist-content {
  cursor: pointer;
}

.playlist-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

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

.playlist-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.2s ease;
}

.edit-btn {
  background-color: #e3f2fd;
  color: #1976d2;
}

.edit-btn:hover {
  background-color: #bbdefb;
}

.delete-btn {
  background-color: #ffebee;
  color: #d32f2f;
}

.delete-btn:hover {
  background-color: #ffcdd2;
}

@media (min-width: 768px) {
  .playlist-card {
    width: 50vw;
  }
}
</style>