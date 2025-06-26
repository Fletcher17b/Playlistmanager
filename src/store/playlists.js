import { playlistAPI } from '../services/api';

export default {
  namespaced: true,
  state: () => ({
    playlists: [],
    loading: false,
    error: null,
  }),
  
  getters: {
    allPlaylists(state) {
      return state.playlists;
    },
    getPlaylistById: (state) => (id) => {
      return state.playlists.find(playlist => playlist.id === id);
    },
  },

  mutations: {
    setPlaylists(state, playlists) {
      state.playlists = playlists;
    },
    addPlaylist(state, playlist) {
      state.playlists.push(playlist);
    },
    updatePlaylist(state, updatedPlaylist) {
      const index = state.playlists.findIndex(p => p.id === updatedPlaylist.id);
      if (index !== -1) {
        state.playlists.splice(index, 1, updatedPlaylist);
      }
    },
    removePlaylist(state, playlistId) {
      state.playlists = state.playlists.filter(p => p.id !== playlistId);
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },

  actions: {
    // Fetch all playlists
    async fetchPlaylists({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const response = await playlistAPI.getPlaylists();
        commit('setPlaylists', response.data);
      } catch (error) {
        commit('setError', error.message || 'Failed to fetch playlists');
        console.error('Error fetching playlists:', error);
      } finally {
        commit('setLoading', false);
      }
    },

    // Create new playlist
    async createPlaylist({ commit }, playlistData) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const response = await playlistAPI.createPlaylist(playlistData);
        commit('addPlaylist', response.data);
        return response.data;
      } catch (error) {
        commit('setError', error.message || 'Failed to create playlist');
        console.error('Error creating playlist:', error);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },

    // Update playlist
    async updatePlaylist({ commit }, { id, playlistData }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const response = await playlistAPI.updatePlaylist(id, playlistData);
        commit('updatePlaylist', response.data);
        return response.data;
      } catch (error) {
        commit('setError', error.message || 'Failed to update playlist');
        console.error('Error updating playlist:', error);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },

    // Delete playlist
    async deletePlaylist({ commit }, playlistId) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        await playlistAPI.deletePlaylist(playlistId);
        commit('removePlaylist', playlistId);
      } catch (error) {
        commit('setError', error.message || 'Failed to delete playlist');
        console.error('Error deleting playlist:', error);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
  },
};
