/**
 * api.js
 * Centralized API service for Playlist Manager frontend.
 * Uses Axios to communicate with the Django REST API backend.
 *
 * Exports:
 *   - playlistAPI: CRUD operations for playlists
 *   - songAPI: CRUD and reorder operations for songs
 *   - api: the raw Axios instance (for advanced use)
 */

import axios from "axios";

// Create an Axios instance with the backend API base URL
const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Playlist API methods
 * Provides functions to interact with playlist endpoints.
 */
export const playlistAPI = {
  /**
   * Get all playlists
   * @returns {Promise} Axios response with playlist list
   */
  getPlaylists() {
    return api.get("playlists/");
  },

  /**
   * Get a single playlist (with its songs)
   * @param {number|string} id - Playlist ID
   * @returns {Promise} Axios response with playlist data
   */
  getPlaylist(id) {
    return api.get(`playlists/${id}/`);
  },

  /**
   * Create a new playlist
   * @param {Object} playlistData - Playlist data (e.g., { name: "My Playlist" })
   * @returns {Promise} Axios response with created playlist
   */
  createPlaylist(playlistData) {
    return api.post("playlists/", playlistData);
  },

  /**
   * Update an existing playlist
   * @param {number|string} id - Playlist ID
   * @param {Object} playlistData - Updated playlist data
   * @returns {Promise} Axios response with updated playlist
   */
  updatePlaylist(id, playlistData) {
    return api.put(`playlists/${id}/`, playlistData);
  },

  /**
   * Delete a playlist
   * @param {number|string} id - Playlist ID
   * @returns {Promise} Axios response
   */
  deletePlaylist(id) {
    return api.delete(`playlists/${id}/`);
  },
};

/**
 * Song API methods
 * Provides functions to interact with song endpoints.
 */
export const songAPI = {
  /**
   * Get all songs
   * @returns {Promise} Axios response with song list
   */
  getSongs() {
    return api.get("songs/");
  },

  /**
   * Get songs by playlist
   * @param {number|string} playlistId - Playlist ID
   * @returns {Promise} Axios response with songs in the playlist
   */
  getSongsByPlaylist(playlistId) {
    return api.get(`songs/?playlist=${playlistId}`);
  },

  /**
   * Create a new song
   * @param {Object} songData - Song data (e.g., { title: "Song Name", artist: "Artist" })
   * @returns {Promise} Axios response with created song
   */
  createSong(songData) {
    return api.post("songs/", songData);
  },

  /**
   * Update an existing song
   * @param {number|string} id - Song ID
   * @param {Object} songData - Updated song data
   * @returns {Promise} Axios response with updated song
   */
  updateSong(id, songData) {
    return api.put(`songs/${id}/`, songData);
  },

  /**
   * Delete a song
   * @param {number|string} id - Song ID
   * @returns {Promise} Axios response
   */
  deleteSong(id) {
    return api.delete(`songs/${id}/`);
  },

  /**
   * Reorder songs in a playlist
   * @param {number|string} playlistId - Playlist ID
   * @param {Array<number|string>} songIds - New order of song IDs
   * @returns {Promise} Axios response
   */
  reorderSongs(playlistId, songIds) {
    return api.post("songs/reorder/", {
      playlist_id: playlistId,
      song_ids: songIds,
    });
  },
};

// Export the raw Axios instance for advanced use
export default api;
