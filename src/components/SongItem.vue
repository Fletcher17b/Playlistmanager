<template>
  <div class="p-4 mb-2 bg-white shadow-md rounded-lg flex justify-between items-center">
    <div>
      <p class="font-semibold">{{ song.title }}</p>
      <p class="text-sm text-gray-600">
        {{ song.artist }} &mdash; {{ song.album }}
      </p>
      <p class="text-xs text-gray-400">{{ song.genre }}</p>
    </div>
    <div class="text-right text-sm text-gray-600">
      {{ song.duration }}
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
/* Optional: styling or animation */
</style>
