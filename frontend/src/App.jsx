import Home from './pages/Home'
import './css/App.css'
import {Routes, Route} from "react-router-dom"
import Favorites from './pages/Favorites'
import { MovieProvider } from './context/MovieContext'
import NavBar from './components/NavBar'

function App() {
   return (
    <MovieProvider>
    <main className="main-content">
     <NavBar />
     <Routes>
       <Route path ="/" element={<Home/>}/>
       <Route path="/favorites" element={<Favorites/>} />
     </Routes>
  
     </main>
    </MovieProvider>
  );
}
  

  

export default App;
