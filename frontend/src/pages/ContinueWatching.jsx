import { useState } from "react";
import "../css/Favorites.css";
import "../css/ContinueWatching.css";
import { useMovieContext } from "../context/MovieContext";
import { getMovieVideos } from "../services/api";
import VideoModal from "../components/VideoModal";

function ContinueWatching() {
    const { continueWatching, removeFromContinueWatching, updateContinueWatching } = useMovieContext();
    const [activeVideoKey, setActiveVideoKey] = useState(null);
    const [currentMovie, setCurrentMovie] = useState(null); // Track which movie is playing

    const handlePlayMovie = async (movie) => {
        try {
            const videoKey = await getMovieVideos(movie.id);
            if (videoKey) {
                setCurrentMovie(movie);       // Save the movie object
                setActiveVideoKey(videoKey);   // Open the modal (This is the ONLY state change)
            } else {
                alert("Trailer video not found for this title!");
            }
        } catch (error) {
            console.error("Error launching video:", error);
        }
    };

    const handleCloseModal = () => {
        // Safe check: Save progress ONLY when closing the modal window
        if (currentMovie && updateContinueWatching) {
            const newProgress = Math.min(currentMovie.progress + 10, 100);
            updateContinueWatching(currentMovie, newProgress);
        }
        // Clean up states
        setActiveVideoKey(null);
        setCurrentMovie(null);
    };

    if (continueWatching.length === 0) {
        return (
            <div className="favorites-empty">
                <h2>Nothing in Progress</h2>
                <p>Click the ▶ button on any movie card to start tracking progress here!</p>
            </div>
        );
    }

    return (
        <div className="favorites">
            <h2>Continue Watching</h2>
            <div className="movies-grid">
                {continueWatching.map((movie, index) => {
                    const uniqueKey = movie.id || movie.title || index;
                    return (
                        <div key={uniqueKey} className="cw-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="cw-poster"
                            />
                            <div className="cw-progress-bar">
                                <div className="cw-progress-fill" style={{ width: `${movie.progress}%` }} />
                            </div>
                            <div className="cw-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.progress}% watched</p>
                                <div className="cw-actions">
                                    <button
                                        className="search-button"
                                        onClick={() => handlePlayMovie(movie)}
                                    >
                                        ▶ Resume
                                    </button>
                                    <button
                                        className="cw-remove-btn"
                                        onClick={() => removeFromContinueWatching(movie.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Force React to treat this component completely independently using a unique key */}
            {activeVideoKey && (
                <VideoModal 
                    key={activeVideoKey}
                    videoKey={activeVideoKey} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
}

export default ContinueWatching;