import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import TvCard from "../Components/TvCard";
import MovieCardSkeleton from "../Components/MovieCardSkeleton";

import {
  searchPopularMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTvShows,
  fetchRecommendedAnime,
  fetchRecommendedKdrama,
  getPopularTvShows,
  fetchRecommendedNollywood,
  fetchRecommendedHollywood,
  fetchRecommendedCdrama
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
  const [recommendedHollywood, SetRecommendedHollywood] = useState([]);
  const [recommendedCdrama, setRecommendedCdrama] = useState([]);

  const renderSkeletons = (count) => {
    return Array(count).fill(0).map((_, index) => (
      <MovieCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  useEffect(() => {
  const query = searchQuery.trim();

  if (!query) {
    const resetData = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies.slice(0, 26));

        const recommendedAnime = await fetchRecommendedAnime();
        setRecommendedAnime(recommendedAnime.slice(0, 26));

        const topRated = await getTopRatedMovies();
        setTopRatedMovies(topRated.slice(0, 26));

        const tvShowsData = await getTvShows();
        setTvShows(tvShowsData.slice(0, 26));

        const recommendedKdrama = await fetchRecommendedKdrama();
        setRecommendedKdrama(recommendedKdrama.slice(0, 26));

        const popularTvShowsData = await getPopularTvShows();
        setPopularTvShows(popularTvShowsData.slice(0, 26));

        const recommendedNollywood = await fetchRecommendedNollywood();
        setRecommendedNollywood(recommendedNollywood.slice(0, 26));

        const recommendedHollywood = await fetchRecommendedHollywood();
        SetRecommendedHollywood(recommendedHollywood.slice(6, 26));

        const recommendedCdrama = await fetchRecommendedCdrama();
        setRecommendedCdrama(recommendedCdrama.slice(0, 26));

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

      {error ? <Error error={error} /> : (
        <div>
          <div className="movie-class">
            <h2>Popular Movies</h2>
            <div className="movies-grid movie-scroll-container">
              {loading 
                ? renderSkeletons(10) 
                : movies.map((movie) => (
                    <MovieCard movie={movie} type={movie.title ? "movie" : "tv"}
                    key={movie.id} />
                  ))}
            </div>
          </div>

          {!searchQuery && (
            <>
              <div className="movie-class">
                <h2>Popular TV Shows</h2>
                <div className="movies-grid movie-scroll-container">
                  {loading 
                    ? renderSkeletons(15) 
                    : popularTvShows.map((movie) => (
                        <MovieCard movie={movie} type={movie.title ? "movie" : "tv"} key={movie.id} />
                      ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Top Rated Movies</h2>
                <div className="movies-grid movie-scroll-container">
                  {loading 
                    ? renderSkeletons(15) 
                    : topRatedMovies.map((movie) => (
                        <MovieCard movie={movie} type="movie" key={movie.id} />
                      ))}
                </div>
              </div>

              <div className="movie-class">
                <h2> Top Rated TV Shows</h2>
                <div className="movies-grid movie-scroll-container">
                  {loading 
                    ? renderSkeletons(15) 
                    : tvShows.map((movie) => (
                        <MovieCard movie={movie} type="tv" key={movie.id} />
                      ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Hollywood Movies</h2>
                <div className="movies-grid movie-scroll-container">
                  {loading 
                    ? renderSkeletons(14) 
                    : recommendedHollywood.map((movie) => (
                        <MovieCard movie={movie} type="movie" key={movie.id} />
                      ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Anime</h2>
                <div className="movies-grid movie-scroll-container">
                  {loading 
                    ? renderSkeletons(10) 
                    : recommendedAnime.map((movie) => (
                        <MovieCard movie={movie} type="tv" key={movie.id} />
                      ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Korean Drama</h2>
                <div className="movies-grid movie-scroll-container">
                  {loading 
                    ? renderSkeletons(10) 
                    : recommendedKdrama.map((movie) => (
                        <MovieCard movie={movie} type="tv" key={movie.id} />
                      ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Nollywood</h2>
                <div className="movies-grid movie-scroll-container">
                  {loading 
                    ? renderSkeletons(10) 
                    : recommendedNollywood.map((movie) => (
                        <MovieCard movie={movie} type="movie" key={movie.id} />
                      ))}
                </div>
              </div>

              <div className="movie-class">
                <h2>Cdrama</h2>
                <div className="movies-grid movie-scroll-container">
                  {loading 
                    ? renderSkeletons(10) 
                    : recommendedCdrama.map((movie) => (
                        <MovieCard movie={movie} type="tv" key={movie.id} />
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
