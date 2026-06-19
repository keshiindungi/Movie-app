import MovieCard from '../components/MovieCard'
import {useState, useEffect} from "react"
import {searchMovies, getPopularMovies} from "../services/api"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovis = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error(error);
                setError("Failed to load popular movies. Please try again later.");
            } 
            finally {
                setLoading(false);
            }
        }; 

        loadPopularMovis();
    }, []);

    // 1. Mark the function as async so we can use await for network calls
    const handleSearch = async (e) => {
        e.preventDefault();
        
        // 2. Prevent searching empty text, or making requests while already loading
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            // 3. Await search results and update the movies list state
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null); // Reset any previous error states if successful
        } catch (error) {
            console.error(error);
            setError("Failed to search movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text"
                    placeholder="search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">search</button>
            </form>

            {/* 4. Display a contextual feedback banner if a network call encounters an exception */}
            {error && <div className="error-message">{error}</div>}

            {/* 5. Dynamically conditionally render either a loading block or our generated cards list */}
            {loading ? (
                <div className="loading">Loading movies...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;