import Home from "./pages/Home";
import Favorites from "./pages/Favourites";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import "./css/App.css";
import TVDetails from "./pages/TVDetails";
import { MovieProvider } from "./contexts/MovieContext";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const movieNumber = 2;

  return (
    <MovieProvider>
      <div>
        <NavBar />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<TVDetails />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
