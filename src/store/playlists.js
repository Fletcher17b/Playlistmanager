export default {
  namespaced: true,
  state: () => ({
    playlists: [
      {
        id: "1",
        name: "Lo-Fi Chill",
        description: "Relaxing beats",
        thumbnail: "https://placekitten.com/200/200",
        created_at: "2025-06-24",
        songCount: 14,
      },
      {
        id: "2",
        name: "Lo-Fi No Chill",
        description: "Not Relaxing beats",
        thumbnail: "https://placekitten.com/200/200",
        created_at: "2025-07-24",
        songCount: 22,
      },
      
    ],
  }),
  getters: {
    allPlaylists(state) {
      return state.playlists;
    },
  },
};
