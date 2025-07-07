import MyComponent from "./MyComponent";
import MovieCard from "./Components/MovieCard";
import Home from "./pages/Home";
import Favorites from "./pages/Favourites";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import "./css/App.css";
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
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
