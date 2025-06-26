import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Playlist API calls
export const playlistAPI = {
  // Get all playlists
  getPlaylists() {
    return api.get('playlists/');
  },

  // Get single playlist with songs
  getPlaylist(id) {
    return api.get(`playlists/${id}/`);
  },

  // Create new playlist
  createPlaylist(playlistData) {
    return api.post('playlists/', playlistData);
  },

  // Update playlist
  updatePlaylist(id, playlistData) {
    return api.put(`playlists/${id}/`, playlistData);
  },

  // Delete playlist
  deletePlaylist(id) {
    return api.delete(`playlists/${id}/`);
  },
};

// Song API calls
export const songAPI = {
  // Get all songs
  getSongs() {
    return api.get('songs/');
  },

  // Get songs by playlist
  getSongsByPlaylist(playlistId) {
    return api.get(`songs/?playlist=${playlistId}`);
  },

  // Create new song
  createSong(songData) {
    return api.post('songs/', songData);
  },

  // Update song
  updateSong(id, songData) {
    return api.put(`songs/${id}/`, songData);
  },

  // Delete song
  deleteSong(id) {
    return api.delete(`songs/${id}/`);
  },

  // Reorder songs in playlist
  reorderSongs(playlistId, songIds) {
    return api.post('songs/reorder/', {
      playlist_id: playlistId,
      song_ids: songIds
    });
  },
};

export default api; 