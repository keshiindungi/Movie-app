import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";
import { getMovieVideos } from "../services/api";

function MovieCard({ movie }) {
    const { 
        isFavorite, addToFavorites, removeFromFavorites, 
        updateContinueWatching,
        inWatchlist, addToWatchlist, removeFromWatchlist,
        openVideoPlayer // 👈 Grab the global player launcher
    } = useMovieContext();
    
    const favorite = isFavorite(movie.id);
    const addedToWatchlist = inWatchlist(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    function onWatchlistClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (addedToWatchlist) removeFromWatchlist(movie.id);
        else addToWatchlist(movie);
    }

    async function onPlayClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (updateContinueWatching) {
            updateContinueWatching(movie, 10);
        }

        try {
            const videoKey = await getMovieVideos(movie.id);
            if (videoKey) {
                openVideoPlayer(videoKey); // 👈 Direct global mount command
            } else {
                alert("Trailer video not found for this title!");
            }
        } catch (error) {
            console.error("Error launching video:", error);
        }
    }

    const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "2026";

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ♥
                    </button>

                    <button className={`watchlist-btn ${addedToWatchlist ? "active" : ""}`} onClick={onWatchlistClick}>
                        {addedToWatchlist ? "✓" : "+"}
                    </button>
                    
                    <button className="play-overlay-btn" onClick={onPlayClick}>
                        ▶ Play
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{releaseYear}</p>
            </div>
        </div>
    );
}

export default MovieCard;