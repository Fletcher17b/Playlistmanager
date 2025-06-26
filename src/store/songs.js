import { songAPI } from '../services/api';

const state = {
  allSongs: [],
  loading: false,
  error: null,
};

const getters = {
  getSongsByPlaylistId: (state) => (playlistId) => {
    return state.allSongs.filter((song) => song.playlist === parseInt(playlistId));
  },
  getAllSongs: (state) => state.allSongs,
};

const mutations = {
  setSongs(state, songs) {
    state.allSongs = songs;
  },
  addSong(state, song) {
    state.allSongs.push(song);
  },
  updateSong(state, updatedSong) {
    const index = state.allSongs.findIndex(s => s.id === updatedSong.id);
    if (index !== -1) {
      state.allSongs.splice(index, 1, updatedSong);
    }
  },
  removeSong(state, songId) {
    state.allSongs = state.allSongs.filter(s => s.id !== songId);
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setError(state, error) {
    state.error = error;
  },
};

const actions = {
  // Fetch all songs
  async fetchSongs({ commit }) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const response = await songAPI.getSongs();
      commit('setSongs', response.data);
    } catch (error) {
      commit('setError', error.message || 'Failed to fetch songs');
      console.error('Error fetching songs:', error);
    } finally {
      commit('setLoading', false);
    }
  },

  // Fetch songs by playlist
  async fetchSongsByPlaylist({ commit }, playlistId) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const response = await songAPI.getSongsByPlaylist(playlistId);
      commit('setSongs', response.data);
    } catch (error) {
      commit('setError', error.message || 'Failed to fetch songs');
      console.error('Error fetching songs:', error);
    } finally {
      commit('setLoading', false);
    }
  },

  // Create new song
  async createSong({ commit }, songData) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const response = await songAPI.createSong(songData);
      commit('addSong', response.data);
      return response.data;
    } catch (error) {
      commit('setError', error.message || 'Failed to create song');
      console.error('Error creating song:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  // Update song
  async updateSong({ commit }, { id, songData }) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const response = await songAPI.updateSong(id, songData);
      commit('updateSong', response.data);
      return response.data;
    } catch (error) {
      commit('setError', error.message || 'Failed to update song');
      console.error('Error updating song:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  // Delete song
  async deleteSong({ commit }, songId) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      await songAPI.deleteSong(songId);
      commit('removeSong', songId);
    } catch (error) {
      commit('setError', error.message || 'Failed to delete song');
      console.error('Error deleting song:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },

  // Reorder songs in playlist
  async reorderSongs({ commit }, { playlistId, songIds }) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const response = await songAPI.reorderSongs(playlistId, songIds);
      commit('setSongs', response.data);
      return response.data;
    } catch (error) {
      commit('setError', error.message || 'Failed to reorder songs');
      console.error('Error reordering songs:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
