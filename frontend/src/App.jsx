import Home from './pages/Home'
import './css/App.css'
import { Routes, Route } from "react-router-dom"
import Favorites from './pages/Favorites'
import Watchlist from './pages/Watchlist'
import ContinueWatching from './pages/ContinueWatching'
import { MovieProvider, useMovieContext } from './context/MovieContext'
import VideoModal from "./components/VideoModal"
import NavBar from './components/NavBar'

// 1. Create a sub-wrapper component so useMovieContext is executed safely UNDER the Provider
function AppContent() {
    const { globalVideoKey, closeVideoPlayer } = useMovieContext();

    return (
        <div className="app-container">
            <NavBar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path="/continue-watching" element={<ContinueWatching />} />
                </Routes>
            </main>

            {/* 🎯 The single, bulletproof global video container hook */}
            {globalVideoKey && (
                <VideoModal 
                    videoKey={globalVideoKey} 
                    onClose={closeVideoPlayer} 
                />
            )}
        </div>
    );
}

// 2. Main App component initializes the state boundary
function App() {
    return (
        <MovieProvider>
            <AppContent />
        </MovieProvider>
    );
}

export default App;