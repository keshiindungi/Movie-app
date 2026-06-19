# 🎬 CineSphere - Movie Web Application

A modern, highly responsive movie discovery web application built with **React**, **Vite**, and **React Router**. The application communicates directly with **The Movie Database (TMDB) API** to fetch live updates on trending movies, search for custom titles, and seamlessly manage a persistent favorites gallery.

---

## 🔗 Deployment & Live Links

Once you host your application (using platforms like Netlify, Vercel, or GitHub Pages), update this section with your live URLs!

* **⚡ Live Production Site:** [👉 Click Here to View Live App](https://your-deployment-link-here.netlify.app)
* **📂 Frontend Repository:** [GitHub Code Link](https://github.com/your-username/movie-app)

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