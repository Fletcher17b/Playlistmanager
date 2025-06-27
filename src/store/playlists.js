/**
 * playlists.js
 * Vuex store module for managing playlist state and operations.
 * 
 * This module handles:
 * - Storing playlist data in the application state
 * - Fetching playlists from the API
 * - Creating, updating, and deleting playlists
 * - Managing loading states and error handling
 * 
 * State structure:
 *   - playlists: Array of playlist objects
 *   - loading: Boolean indicating if an API request is in progress
 *   - error: String containing error message (null if no error)
 */

import { playlistAPI } from "../services/api";

export default {
  // Enable namespacing to avoid naming conflicts
  namespaced: true,
  
  // Application state (reactive data)
  state: () => ({
    playlists: [], // Array of playlist objects
    loading: false, // Loading state for API requests
    error: null, // Error message (null when no error)
  }),

  // Getters (computed properties for accessing state)
  getters: {
    /**
     * Returns all playlists from the state
     * @param {Object} state - Vuex state object
     * @returns {Array} Array of playlist objects
     */
    allPlaylists(state) {
      return state.playlists;
    },
    
    /**
     * Returns a specific playlist by ID
     * @param {Object} state - Vuex state object
     * @returns {Function} Function that takes an ID and returns the playlist
     */
    getPlaylistById: (state) => (id) => {
      return state.playlists.find((playlist) => playlist.id === id);
    },
  },

  // Mutations (synchronous state changes)
  mutations: {
    /**
     * Sets the entire playlists array
     * @param {Object} state - Vuex state object
     * @param {Array} playlists - Array of playlist objects
     */
    setPlaylists(state, playlists) {
      state.playlists = playlists;
    },
    
    /**
     * Adds a new playlist to the state
     * @param {Object} state - Vuex state object
     * @param {Object} playlist - Playlist object to add
     */
    addPlaylist(state, playlist) {
      state.playlists.push(playlist);
    },
    
    /**
     * Updates an existing playlist in the state
     * @param {Object} state - Vuex state object
     * @param {Object} updatedPlaylist - Updated playlist object
     */
    updatePlaylist(state, updatedPlaylist) {
      const index = state.playlists.findIndex(
        (p) => p.id === updatedPlaylist.id
      );
      if (index !== -1) {
        state.playlists.splice(index, 1, updatedPlaylist);
      }
    },
    
    /**
     * Removes a playlist from the state by ID
     * @param {Object} state - Vuex state object
     * @param {number|string} playlistId - ID of the playlist to remove
     */
    removePlaylist(state, playlistId) {
      state.playlists = state.playlists.filter((p) => p.id !== playlistId);
    },
    
    /**
     * Sets the loading state
     * @param {Object} state - Vuex state object
     * @param {boolean} loading - Loading state value
     */
    setLoading(state, loading) {
      state.loading = loading;
    },
    
    /**
     * Sets the error state
     * @param {Object} state - Vuex state object
     * @param {string|null} error - Error message or null
     */
    setError(state, error) {
      state.error = error;
    },
  },

  // Actions (asynchronous operations that can commit mutations)
  actions: {
    /**
     * Fetches all playlists from the API
     * @param {Object} context - Vuex context object
     * @param {Function} context.commit - Function to commit mutations
     */
    async fetchPlaylists({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const response = await playlistAPI.getPlaylists();
        commit("setPlaylists", response.data);
      } catch (error) {
        commit("setError", error.message || "Failed to fetch playlists");
        console.error("Error fetching playlists:", error);
      } finally {
        commit("setLoading", false);
      }
    },

    /**
     * Creates a new playlist via API
     * @param {Object} context - Vuex context object
     * @param {Function} context.commit - Function to commit mutations
     * @param {Object} playlistData - Data for the new playlist
     * @returns {Promise<Object>} Created playlist object
     * @throws {Error} If playlist creation fails
     */
    async createPlaylist({ commit }, playlistData) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const response = await playlistAPI.createPlaylist(playlistData);
        commit("addPlaylist", response.data);
        return response.data;
      } catch (error) {
        commit("setError", error.message || "Failed to create playlist");
        console.error("Error creating playlist:", error);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    /**
     * Updates an existing playlist via API
     * @param {Object} context - Vuex context object
     * @param {Function} context.commit - Function to commit mutations
     * @param {Object} payload - Object containing id and playlistData
     * @param {number|string} payload.id - Playlist ID to update
     * @param {Object} payload.playlistData - Updated playlist data
     * @returns {Promise<Object>} Updated playlist object
     * @throws {Error} If playlist update fails
     */
    async updatePlaylist({ commit }, { id, playlistData }) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        const response = await playlistAPI.updatePlaylist(id, playlistData);
        commit("updatePlaylist", response.data);
        return response.data;
      } catch (error) {
        commit("setError", error.message || "Failed to update playlist");
        console.error("Error updating playlist:", error);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    /**
     * Deletes a playlist via API
     * @param {Object} context - Vuex context object
     * @param {Function} context.commit - Function to commit mutations
     * @param {number|string} playlistId - ID of the playlist to delete
     * @throws {Error} If playlist deletion fails
     */
    async deletePlaylist({ commit }, playlistId) {
      commit("setLoading", true);
      commit("setError", null);
      try {
        await playlistAPI.deletePlaylist(playlistId);
        commit("removePlaylist", playlistId);
      } catch (error) {
        commit("setError", error.message || "Failed to delete playlist");
        console.error("Error deleting playlist:", error);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
