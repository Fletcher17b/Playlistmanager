<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Add Song to Playlist</h2>
      <form @submit.prevent="handleSubmit">
        <label>
          Title:
          <input v-model="form.title" required />
        </label>
        <label>
          Artist:
          <input v-model="form.artist" required />
        </label>
        <label>
          Album:
          <input v-model="form.album" />
        </label>
        <label>
          Duration (mm:ss):
          <input
            v-model="form.duration"
            placeholder="3:45"
            required
            pattern="[0-9]+:[0-5][0-9]"
          />
        </label>
        <label>
          Genre:
          <input v-model="form.genre" />
        </label>
        <div class="modal-actions">
          <button type="submit">Add Song</button>
          <button type="button" @click="close">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddSongModal",
  props: {
    playlistId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      form: {
        title: "",
        artist: "",
        album: "",
        duration: "",
        genre: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      const payload = {
        ...this.form,
        playlist: this.playlistId,
      };
      this.$emit("save", payload);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--background-color, white);
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
}

.modal-content h2 {
  margin-bottom: 1rem;
}

.modal-content label {
  display: block;
  margin-bottom: 1rem;
}

.modal-content input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-actions button[type="submit"] {
  background: #007bff;
  color: white;
}

.modal-actions button[type="submit"]:hover {
  background: #0056b3;
}

.modal-actions button[type="button"] {
  background: #6c757d;
  color: white;
}

.modal-actions button[type="button"]:hover {
  background: #545b62;
}
</style>
