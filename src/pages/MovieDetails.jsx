import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById, fetchMovieVideos, fetchMovieCredits, fetchSimilarMovies, fetchRecommendedMovies } from "../services/api";
import "../css/MovieDetails.css";
import MovieCard from "../Components/MovieCard";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const loadMovie = async () => {
        const data = await fetchMovieById(id);
        setMovie(data);

        const videos = await fetchMovieVideos(id);
        const officialTrailer = videos.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(officialTrailer);


        const credits = await fetchMovieCredits(id);
        setCast(credits.cast.slice(0, 15));
        setCrew(credits.crew.filter(member => member.job === "Director" || member.job === "Producer" || member.job === "Writer").splice(0, 5));


        const similarMovies = await fetchSimilarMovies(id);
        setSimilarMovies(similarMovies.splice(0, 5));
        const recommendedMovies = await fetchRecommendedMovies(id);
        setRecommendedMovies(recommendedMovies.splice(0, 5));




        
    };

    loadMovie();
  }, [id]);




  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-details-container">
      <div className="poster-section">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </div>

      <div className="info-section">
        <h1 className="movie-title">{movie.title}</h1>
        <p className="release-year">Release Year: {movie.release_date?.split("-")[0]}</p>
        <p className="overview">{movie.overview}</p>

        <ul className="movie-meta">
          <li><strong>Rating:</strong> {movie.vote_average} ⭐</li>
          <li><strong>Language:</strong> {movie.original_language.toUpperCase()}</li>
          <li><strong>Runtime:</strong> {movie.runtime} minutes</li>
          <li><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</li>
            <li><strong>Production Companies:</strong> {movie.production_companies?.map(c => c.name).join(", ")}</li>
            <li><strong>Production Countries:</strong> {movie.production_countries?.map(c => c.name).join(", ")}</li>
            


        </ul>

        <div>
            <h3>Cast</h3>
            <ul className="cast-list movie-scroll-container">
                {cast.map((member) => (
                <li key={member.id} className="cast-member ">
                    <img
                    src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                    alt={member.name}
                    className="cast-photo"
                    />
                    <div className="cast-info">
                    <p className="cast-name">{member.name}</p>
                    <p className="character-name">as {member.character}</p>
                    </div>
                </li>
                ))}
            </ul>

            <h3>Crew</h3>
            <ul className="crew-list">
                {crew.map((member) => (
                <li key={member.id} className="cast-member">
                    <img
                    src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                    alt={member.name}
                    className="cast-photo"
                    />
                    <div className="cast-info">
                    <p className="cast-name">{member.name}</p>
                    <p className="cast-job">{member.job}</p>
                    </div>
                </li>
                ))}
            </ul>

        </div>
        <div>
          {trailer && (
          <div className="trailer-section">
            <h3>Watch Trailer</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        </div>
        <div className="similar-movies">
            <h3>Similar Movies</h3>
            <div className="movies-grid movie-scroll-container">
                {similarMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
        <div className="recommended-movies">
            <h3>Recommended Movies</h3>
            <div className="movies-grid movie-scroll-container">
                {recommendedMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default MovieDetails;
