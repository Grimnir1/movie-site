import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import TvCard from "../Components/TvCard";
import { searchPopularMovies, getPopularMovies, getTopRatedMovies, getTvShows } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies.splice(0, 5)); // Limit to 10 results
        setError(null);

        const topRated = await getTopRatedMovies();
        setTopRatedMovies(topRated.splice(0, 5)); // Limit to 10
        setError(null);


        const tvShowsData = await getTvShows();
        setTvShows(tvShowsData.splice(0, 5)); // Limit to 10
        

      } catch (error) {
        console.log(error);
        setError("Failed to fetch popular movies.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);

    try {
      const searchResults = await searchPopularMovies(searchQuery);
      if (searchResults.length === 0) {
        setError("No movies found.");
      } else {
        setMovies(searchResults.splice(0, 10)); 
        setError(null);
      }

    } catch (error) {
      console.log(error);
      setError("Failed to fetch search results.");
      setMovies([]); 
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form action="" onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}

      <div>
        <h2 className="top-rated-title">Top Rated Movies</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {topRatedMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="top-rated-title">Tv Shows</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {tvShows.map((movie) => (
              <TvCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
