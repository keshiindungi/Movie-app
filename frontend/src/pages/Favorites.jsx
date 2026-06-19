import "../css/Favorites.css"
import { useMovieContext } from "../context/MovieContext"
import MovieCard from "../components/MovieCard"

function Favorite() {
    const { favorites } = useMovieContext()

    if (favorites.length === 0) {
        return (
            <div className="favorites-empty">
                <h2>No Favorite Movies Yet</h2>
                <p>Start adding movies from the home page to see them appear here!</p>
            </div>
        );
    }

    return (
        <div className="favorites">
            <h2>Your Favorites</h2>
            <div className="movies-grid">
                {favorites.map((movie, index) => {
                    // DEFENSIVE FALLBACK STRATEGY:
                    // 1. Try movie.id (standard)
                    // 2. Fall back to movie.title if ID is undefined
                    // 3. Fall back to the loop array index (0, 1, 2...) as a final safety net
                    const uniqueKey = movie.id || movie.title || index;

                    return (
                        <MovieCard 
                            movie={movie} 
                            key={uniqueKey} 
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Favorite;