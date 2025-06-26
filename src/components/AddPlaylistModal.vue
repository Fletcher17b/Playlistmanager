<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>{{ isEdit ? "Edit Playlist" : "New Playlist" }}</h2>
      <form @submit.prevent="handleSubmit">
        <label>
          Name:
          <input v-model="form.name" required />
        </label>
        <label>
          Description:
          <textarea v-model="form.description" />
        </label>
        <label>
          Thumbnail URL:
          <input v-model="form.thumbnail" />
        </label>
        <div class="modal-actions">
          <button type="submit">{{ isEdit ? "Update" : "Create" }}</button>
          <button type="button" @click="close">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPlaylistModal",
  props: {
    editingPlaylist: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        thumbnail: "",
      },
    };
  },
  computed: {
    isEdit() {
      return !!this.editingPlaylist;
    },
  },
  methods: {
    handleSubmit() {
      const payload = {
        ...this.form,
        id: this.isEdit ? this.editingPlaylist.id : Date.now().toString(),
        created_at: this.isEdit
          ? this.editingPlaylist.created_at
          : new Date().toISOString(),
      };
      this.$emit("save", payload);
    },
    close() {
      this.$emit("close");
    },
  },
  mounted() {
    if (this.isEdit) {
      this.form = {
        name: this.editingPlaylist.name,
        description: this.editingPlaylist.description,
        thumbnail: this.editingPlaylist.thumbnail,
      };
    }
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

.modal-content input,
.modal-content textarea {
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
</style>
