<template>
  
  <div class="playlist-card" @click="goToPlaylist" style="margin: 2vh;">
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
  },
};
</script>


<style scoped>
.playlist-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.playlist-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
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

@media (min-width: 768px) {
  .playlist-card {
    width: 50vw;
  }
}
</style>