# Playlist Manager Frontend

Welcome to the **Playlist Manager** frontend! This is a modern, user-friendly web application built with [Vue.js](https://vuejs.org/) that lets you manage music playlists with ease.

---

## 🚀 Project Overview
This project is the frontend for the Playlist Manager app. It allows users to:
- View, create, and delete playlists
- Add, remove, and reorder songs in playlists
- Search for songs
- Enjoy a responsive, interactive UI

The frontend communicates with a Django REST API backend.

---

## 🛠️ Prerequisites
Before you start, make sure you have:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- (Optional) [Docker](https://www.docker.com/) for containerized development

---

## ⚡ Quick Start (Local Development)
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run serve
   ```
3. Open your browser and go to [http://localhost:8080](http://localhost:8080)

---

## 🐳 Running with Docker
If you prefer Docker, from the project root:
```bash
docker-compose up --build
```
This will start both the frontend (Vue) and backend (Django) containers.

---

## 📁 Project Structure
```
playlistmanager/
├── public/              # Static files (index.html, favicon, etc.)
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Vue components (UI building blocks)
│   ├── router/          # Vue Router setup
│   ├── services/        # API service (handles backend requests)
│   ├── store/           # Vuex store (state management)
│   ├── views/           # Page-level components
│   └── App.vue          # Root Vue component
│   └── main.js          # App entry point
├── package.json         # Project metadata and scripts
└── README.md            # This file
```

---

## 🧑‍💻 How to Add Features or Components
1. **Create a new component:**
   - Add a `.vue` file in `src/components/`.
2. **Use the component:**
   - Import and register it in a parent component or view.
3. **State management:**
   - Use `src/store/` (Vuex) for shared state.
4. **API calls:**
   - Use `src/services/api.js` to interact with the backend.

---

## 🔗 Connecting to the Backend
- The frontend expects the backend API at `http://localhost:8000/api` (configurable in Docker and `.env` files).
- All API requests are handled through `src/services/api.js`.
- Make sure the backend is running for full functionality.

---

## 🛠️ Common Issues & Troubleshooting
- **Port conflicts:** Make sure nothing else is running on ports 8080 (frontend) or 8000 (backend).
- **CORS errors:** Ensure the backend allows requests from the frontend (already configured if using provided Django backend).
- **API errors:** Check that the backend is running and accessible at the expected URL.
- **Dependency issues:** Run `npm install` to ensure all packages are installed.

---

## 📚 Learn More
- [Vue.js Guide](https://vuejs.org/guide/introduction.html)
- [Vue CLI Docs](https://cli.vuejs.org/)
- [Vuex Docs](https://vuex.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Django REST Framework](https://www.django-rest-framework.org/)

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Questions?
If you have any questions or need help, feel free to open an issue or contact the project maintainer.
