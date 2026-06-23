import { createContext, useState, useContext, useEffect } from "react"

const MovieContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    // --- FAVORITES STATE ---
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites")
        return storedFavorites ? JSON.parse(storedFavorites) : []
    })

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

    // --- CONTINUE WATCHING STATE ---
    const [continueWatching, setContinueWatching] = useState(() => {
        const storedCW = localStorage.getItem("continueWatching")
        return storedCW ? JSON.parse(storedCW) : []
    })

    useEffect(() => {
        localStorage.setItem("continueWatching", JSON.stringify(continueWatching))
    }, [continueWatching])

    // Updates movie progress, or adds it if it doesn't exist yet
    const updateContinueWatching = (movie, progress) => {
        setContinueWatching((prevList) => {
            const exists = prevList.some((item) => Number(item.id) === Number(movie.id))
            
            if (exists) {
                return prevList.map((item) => 
                    Number(item.id) === Number(movie.id) ? { ...item, progress: progress } : item
                )
            } else {
                return [...prevList, { ...movie, progress: progress }]
            }
        })
    }

    const removeFromContinueWatching = (movieId) => {
        setContinueWatching((prevList) => 
            prevList.filter((item) => Number(item.id) !== Number(movieId))
        )
    }

    // --- WATCHLIST STATE ---
    const [watchlist, setWatchlist] = useState(() => {
        const storedWatchlist = localStorage.getItem("watchlist")
        return storedWatchlist ? JSON.parse(storedWatchlist) : []
    })

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }, [watchlist])

    const addToWatchlist = (movie) => {
        setWatchlist((prevWatchlist) => {
            if (!prevWatchlist.some((item) => Number(item.id) === Number(movie.id))) {
                return [...prevWatchlist, movie]
            }
            return prevWatchlist
        })
    }

    const removeFromWatchlist = (movieId) => {
        setWatchlist((prevWatchlist) => 
            prevWatchlist.filter((item) => Number(item.id) !== Number(movieId))
        )
    }

    const inWatchlist = (movieId) => {
        return watchlist.some((item) => Number(item.id) === Number(movieId))
    }
    
    // --- 🛠️ FIX: ADDED GLOBAL MODAL STATE MANAGEMENT ---
    const [globalVideoKey, setGlobalVideoKey] = useState(null)

    const openVideoPlayer = (videoKey) => {
        setGlobalVideoKey(videoKey)
    }

    const closeVideoPlayer = () => {
        setGlobalVideoKey(null)
    }

    // --- BUNDLED CONTEXT PACKAGE ---
    const value = {
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        continueWatching,
        updateContinueWatching,
        removeFromContinueWatching,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        inWatchlist,
        // 🛠️ FIX: Exposing video player state/functions to components
        globalVideoKey,
        openVideoPlayer,
        closeVideoPlayer
    }

    return (
        <MovieContext.Provider value={value}>
             {children}
        </MovieContext.Provider> 
    )
}