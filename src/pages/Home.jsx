import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import TvCard from "../Components/TvCard";
import Loading from "../Components/Loading";

import {
  searchPopularMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTvShows,
  fetchRecommendedAnime,
  fetchRecommendedKdrama,
  getPopularTvShows,
  fetchRecommendedNollywood
} from "../services/api";
import "../css/Home.css";
import Error from "../Components/Error";  

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [recommendedAnime, setRecommendedAnime] = useState([]);
  const [recommendedKdrama, setRecommendedKdrama] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [recommendedNollywood, setRecommendedNollywood] = useState([]);

  useEffect(() => {
  const query = searchQuery.trim();

  if (!query) {
    const resetData = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies.slice(0, 10));

        const recommendedAnime = await fetchRecommendedAnime();
        setRecommendedAnime(recommendedAnime.slice(0, 10));

        const topRated = await getTopRatedMovies();
        setTopRatedMovies(topRated.slice(0, 15));

        const tvShowsData = await getTvShows();
        setTvShows(tvShowsData.slice(0, 15));

        const recommendedKdrama = await fetchRecommendedKdrama();
        setRecommendedKdrama(recommendedKdrama.slice(0, 10));

        const popularTvShowsData = await getPopularTvShows();
        setPopularTvShows(popularTvShowsData.slice(0, 15));

        const recommendedNollywood = await fetchRecommendedNollywood();
        setRecommendedNollywood(recommendedNollywood.slice(0, 10));

        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch movie data.");
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

      {loading ? ( 
        <Loading />
      ): error ? <Error error={error} /> : (
        <div>
          <div className="movie-class">
            <h2>Popular Movies</h2>
            <div className="movies-grid movie-scroll-container">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>

          {!searchQuery && (
            <>
              <div className="movie-class">
                <h2>Popular TV Shows</h2>
                <div className="movies-grid movie-scroll-container">
                  {popularTvShows.map((movie) => (
                    <TvCard movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Top Rated Movies</h2>
                <div className="movies-grid movie-scroll-container">
                  {topRatedMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>

              <div className="movie-class">
                <h2> Top Rated TV Shows</h2>
                <div className="movies-grid movie-scroll-container">
                  {tvShows.map((movie) => (
                    <TvCard movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Anime</h2>
                <div className="movies-grid movie-scroll-container">
                  {recommendedAnime.map((movie) => (
                    <TvCard movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Kdrama</h2>
                <div className="movies-grid movie-scroll-container">
                  {recommendedKdrama.map((movie) => (
                    <TvCard movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Nollywood</h2>
                <div className="movies-grid movie-scroll-container">
                  {recommendedNollywood.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
