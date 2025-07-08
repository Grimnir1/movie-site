import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import TvCard from "../Components/TvCard";
import {
  searchPopularMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTvShows,
} from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
  const query = searchQuery.trim();

  if (!query) {
    const resetData = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies.slice(0, 10));

        const topRated = await getTopRatedMovies();
        setTopRatedMovies(topRated.slice(0, 5));

        const tvShowsData = await getTvShows();
        setTvShows(tvShowsData.slice(0, 5));

        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to reload default data.");
      } finally {
        setLoading(false);
      }
    };

    resetData();
    return;
  }

  const delayDebounce = setTimeout(async () => {
    setLoading(true);
    try {
      const results = await searchPopularMovies(query);
      if (results.length === 0) {
        setError("No movies found.");
        setMovies([]);
      } else {
        setMovies(results.slice(0, 10));
        setTopRatedMovies([]);
        setTvShows([]);
        setError(null);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch search results.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, 500);

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);


  return (
    <div className="home">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          {/* <h2>Popular Movies</h2> */}
          <div className="movies-grid movie-scroll-container">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          {!searchQuery && (
            <>
              <h2>Top Rated</h2>
              <div className="movies-grid">
                {topRatedMovies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>

              <h2>TV Shows</h2>
              <div className="movies-grid">
                {tvShows.map((movie) => (
                  <TvCard movie={movie} key={movie.id} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
