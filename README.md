# 🎬 CineSphere - Movie Web Application

A modern, highly responsive movie discovery web application built with **React**, **Vite**, and **React Router**. The application communicates directly with **The Movie Database (TMDB) API** to fetch live updates on trending movies, search for custom titles, and seamlessly manage a persistent favorites gallery.

---

## 🔗 Deployment & Live Links

Once you host your application (using platforms like Netlify, Vercel, or GitHub Pages), update this section with your live URLs!

* **⚡ Live Production Site:**[https://movie-app-mhi8.onrender.com)]
* **📂 Frontend Repository:**(https://github.com/keshiindungi/Movie-app.git)

---

## ✨ Features

* **🔥 Live Movie Feed:** Renders trending titles straight from the TMDB backend service.
* **🔍 Dynamic Search Bar:** Instantly lookup movies globally through specialized API endpoints.
* **❤️ Global State Favorites:** Save or remove movies from a personalized collection using React Context.
* **💾 Local Storage Persistence:** Hardened, lazy-initialized caching layers keep your favorites perfectly saved even after a full browser refresh.
* **📱 Fully Responsive:** Clean grid styling adjustments configured across mobile, tablet, and desktop views.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** React 18+ (with Vite for blindingly fast hot-reloading compilation)
* **Routing:** React Router DOM (Declarative client-side routing)
* **State Management:** React Context API (Custom provider and unified hooks architecture)
* **Styling:** Native CSS Grid & Flexbox layout alignments

### 📂 Directory Structure Highlight
```text
src/
├── components/
│   ├── MovieCard.jsx     # Individual card layout with action toggle buttons
│   └── NavBar.jsx        # Navigation switchboard structure
├── context/
│   └── MovieContext.jsx  # Context Provider managing global favorites arrays
├── pages/
│   ├── Home.jsx          # Search and trending grid platform landing
│   └── Favorites.jsx     # Defensive, fall-back key mapped user gallery
├── css/                  # Native architectural styling sheets
├── App.jsx               # Wrapped main route assembly
└── main.jsx              # Application bootstrap mount point

🚀 Local Installation & Set Up
Follow these simple steps to run this project locally on your machine:

1. Clone the Repository
Bash
git clone [https://github.com/your-username/movie-app.git](https://github.com/your-username/movie-app.git)
cd movie-app
2. Install Project Dependencies
Bash
npm install
3. Set Up Your TMDB API Key
Create a .env file in your root folder and add your TMDB access key:

Code snippet
VITE_TMDB_API_KEY=your_actual_api_key_here
4. Run the Development Server
Bash
npm run dev
Open your browser and navigate to http://localhost:5173 to see your running instance!

📝 Key Code Learnings Included
Lazy State Initialization: Implemented inside useState to load from localStorage smoothly before the first render loop, avoiding cascading layout performance drops.

Defensive Key Mapping: The favorites grid utilizes a fallback sequence (id -> title -> index) to keep React rendering stable, regardless of missing values in data payloads.
