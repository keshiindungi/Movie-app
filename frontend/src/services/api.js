const API_KEY = "f133a967f18f4cae01bf89a09fe0907d"
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}
export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
    )}`
);
    const data = await response.json();
    return data.results;
};

export const getMovieVideos = async (movieId) => {
    try {
        if (!movieId) {
            console.error("getMovieVideos was called without a valid movieId!");
            return null;
        }

        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            console.warn(`No videos found at all on TMDB for movie ID: ${movieId}`);
            return null;
        }

        // 1. First choice: Look for an official trailer on YouTube
        let videoMatch = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        
        // 2. Second choice fallback: If no trailer, grab ANY YouTube video available (Teaser, Clip, Featurette)
        if (!videoMatch) {
            videoMatch = data.results.find(video => video.site === "YouTube");
        }
        
        console.log(`Successfully found video key for movie ${movieId}:`, videoMatch ? videoMatch.key : "None");
        return videoMatch ? videoMatch.key : null;

    } catch (error) {
        console.error("Network error fetching videos from TMDB:", error);
        return null;
    }
};