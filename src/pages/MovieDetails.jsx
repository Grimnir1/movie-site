import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById, fetchMovieVideos } from "../services/api";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieById(id);
      setMovie(data);

      const videos = await fetchMovieVideos(id);
      const officialTrailer = videos.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailer(officialTrailer);
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
        </ul>

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
    </div>
  );
}

export default MovieDetails;
