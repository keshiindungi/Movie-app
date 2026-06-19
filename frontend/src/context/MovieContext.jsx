import { createContext, useState, useContext, useEffect } from "react"

const MovieContext = createContext()

// Add this special comment right above your hook to tell ESLint: 
// "I know what I'm doing, let this custom hook export slide!"
// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    // 1. Lazy State Initialization: Read from localStorage BEFORE the first render!
    // This completely removes the startup 'cascading render' and kills the ESLint error.
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites")
        return storedFavorites ? JSON.parse(storedFavorites) : []
    })

    // 2. State Sync Effect: This automatically saves changes whenever 'favorites' changes
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites((prevFavorites) => {
          if (!prevFavorites.some((fav) => Number(fav.id) === Number(movie.id))) {
            return [...prevFavorites, movie]
        }
        return prevFavorites
    })
}

   const removeFromFavorites = (movieId) => {
    setFavorites((prevFavorites) => 
        prevFavorites.filter((fav) => Number(fav.id) !== Number(movieId))
    )
}

  const isFavorite = (movieId) => {
    return favorites.some((fav) => Number(fav.id) === Number(movieId))
} 

    // 3. Bundled context package
    const value = {
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return (
        // 4. Point value straight to our packaged bundle variable
        <MovieContext.Provider value={value}>
             {children}
        </MovieContext.Provider> 
    )
}