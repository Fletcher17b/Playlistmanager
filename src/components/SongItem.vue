<template>
  <div class="song-card">
    <div class="song-header">
      <div class="drag-handle">⋮⋮</div>
      <div class="song-info">
        <p class="title">{{ song.title || "Unknown Artist" }}</p>
        <p class="meta">
          {{ song.artist || "Unknown Artist" }} —
          {{ song.album || "Unknown Album" }}
        </p>
        <p class="genre">{{ song.genre || "-" }}</p>
      </div>
      <div class="duration">{{ song.duration || "0:00" }}</div>
    </div>
    <div class="song-actions">
      <button
        @click="$emit('edit', song)"
        class="edit-btn"
        style="display: none"
      >
        ✏️ Edit
      </button>
      <button @click="$emit('delete', song.id)" class="delete-btn">
        🗑️ Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style scoped>
.song-card {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  cursor: grab;
  transition: all 0.2s ease;
}

.song-card:active {
  cursor: grabbing;
}

.song-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.drag-handle {
  color: #ccc;
  font-size: 1.2rem;
  cursor: grab;
  user-select: none;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.drag-handle:hover {
  color: #999;
}

.song-info {
  flex: 1 1 auto;
}

.title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}

.meta {
  font-size: 0.9rem;
  color: #666;
  margin: 0.2rem 0;
}

.genre {
  font-size: 0.8rem;
  color: #999;
}

.duration {
  font-size: 0.9rem;
  color: #333;
  align-self: center;
}

.song-actions {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.song-actions button {
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.edit-btn {
  background: #eef6ff;
  color: #007bff;
}

.edit-btn:hover {
  background: #d0e8ff;
}

.delete-btn {
  background: #ffeeee;
  color: #cc0000;
}

.delete-btn:hover {
  background: #ffcaca;
}
</style>
