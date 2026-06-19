import '../css/MovieCard.css'
import { useMovieContext } from '../context/MovieContext'

 function MovieCard({ movie }) {
     const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
  
     const favorite = isFavorite(movie.id)
     
    function onFavoriteClick(e){
    e.preventDefault()
    
    // Create a safe movie object copy ensuring an ID is explicitly present
    const safeMoviePayload = {
        ...movie,
        id: movie.id || movie.title // Fallback to title string if ID is missing
    }

    // Force a clear evaluation check using our guaranteed id property
    const safeId = movie.id || movie.title

    if(favorite){
        removeFromFavorites(safeId)
    } else {
        addToFavorites(safeMoviePayload) // Push the fully validated payload
    }
}
     
    return<div className="movie-card">
    <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
         <div className="movie-overlay">
            <button className="Favorite-btn" onClick={onFavoriteClick}>
                🤍
            </button>
         </div>
     </div>
     <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
     </div>
    </div>
}

export default MovieCard