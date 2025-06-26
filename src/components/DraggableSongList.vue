<template>
  <div class="draggable-song-list">
    <draggable
      v-model="localSongs"
      @end="onDragEnd"
      item-key="id"
      class="song-list"
      ghost-class="ghost-song"
      chosen-class="chosen-song"
      drag-class="dragging-song"
    >
      <template #item="{ element: song }">
        <div class="song-item-wrapper">
          <SongItem
            :song="song"
            @delete="$emit('delete', song.id)"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import SongItem from './SongItem.vue';

export default {
  name: 'DraggableSongList',
  components: {
    draggable,
    SongItem,
  },
  props: {
    songs: {
      type: Array,
      required: true,
    },
    playlistId: {
      type: [String, Number],
      required: true,
    },
  },
  emits: ['delete', 'reorder'],
  data() {
    return {
      localSongs: [...this.songs],
    };
  },
  watch: {
    songs: {
      handler(newSongs) {
        this.localSongs = [...newSongs];
      },
      deep: true,
    },
  },
  methods: {
    onDragEnd(evt) {
      // Get the new order of song IDs
      const songIds = this.localSongs.map(song => song.id);
      
      // Emit the reorder event
      this.$emit('reorder', {
        playlistId: this.playlistId,
        songIds: songIds,
        oldIndex: evt.oldIndex,
        newIndex: evt.newIndex,
      });
    },
  },
};
</script>

<style scoped>
.draggable-song-list {
  width: 100%;
}

.song-list {
  min-height: 50px;
}

.song-item-wrapper {
  margin-bottom: 0.5rem;
}

/* Drag and drop visual feedback */
.ghost-song {
  opacity: 0.5;
  background: #f0f0f0;
  border: 2px dashed #ccc;
}

.chosen-song {
  background: #e3f2fd;
  transform: rotate(2deg);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dragging-song {
  background: #fff3e0;
  transform: rotate(5deg);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

/* Smooth transitions */
.song-item-wrapper {
  transition: all 0.2s ease;
}

.song-item-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style> 