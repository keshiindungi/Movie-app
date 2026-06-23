import "../css/Favorites.css"; // Reuses your existing Favorites layout styles
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
    const { watchlist } = useMovieContext();

    if (watchlist.length === 0) {
        return (
            <div className="favorites-empty">
                <h2>Your Watchlist is Empty</h2>
                <p>Click the "+" icon on movies to save titles you want to watch later!</p>
            </div>
        );
    }

    return (
        <div className="favorites">
            <h2>My Watchlist</h2>
            <div className="movies-grid">
                {watchlist.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    );
}

export default Watchlist;