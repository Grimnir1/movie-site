import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchTvById,
  fetchTvVideos,
  fetchTvCredits,
  fetchSimilarTvShows,
  fetchRecommendedTvShows
} from "../services/api";
import "../css/MovieDetails.css";
import MovieCard from "../Components/MovieCard";
import Loading from "../Components/Loading";
function TVDetails() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [recommendedShows, setRecommendedShows] = useState([]);

  useEffect(() => {
    const loadTV = async () => {
      const data = await fetchTvById(id);
      setTv(data);

      const videos = await fetchTvVideos(id);
      const officialTrailer = videos.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailer(officialTrailer);

      const credits = await fetchTvCredits(id);
      setCast(credits.cast.slice(0, 7));
      setCrew(
        credits.crew
          .filter(
            (member) =>
              member.job === "Director" ||
              member.job === "Producer" ||
              member.job === "Writer"
          )
          .splice(0, 5)
      );

      const similar = await fetchSimilarTvShows(id);
      setSimilarShows(similar.splice(0, 5));

      const recommended = await fetchRecommendedTvShows(id);
      setRecommendedShows(recommended.splice(0, 5));
    };

    loadTV();
  }, [id]);

  if (!tv) return <Loading />;

  return (
    <div className="movie-details-container">
      <div className="poster-section">
        <img
          src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
          alt={tv.name}
          className="movie-poster"
        />
      </div>

      <div className="info-section">
        <h1 className="movie-title">{tv.name}</h1>
        <p className="release-year">
          First Air Date: {tv.first_air_date?.split("-")[0]}
        </p>
        <p className="overview">{tv.overview}</p>

        <ul className="movie-meta">
          <li>
            <strong>Rating:</strong> {tv.vote_average} ⭐
          </li>
          <li>
            <strong>Language:</strong> {tv.original_language?.toUpperCase()}
          </li>
          <li>
            <strong>Runtime:</strong>{" "}
            {tv.episode_run_time?.[0] || "N/A"} minutes
          </li>
          <li>
            <strong>Genres:</strong> {tv.genres?.map((g) => g.name).join(", ")}
          </li>
          <li>
            <strong>Production Companies:</strong>{" "}
            {tv.production_companies?.map((c) => c.name).join(", ")}
          </li>
          <li>
            <strong>Production Countries:</strong>{" "}
            {tv.production_countries?.map((c) => c.name).join(", ")}
          </li>
        </ul>

        <div>
          <h3>Cast</h3>
          <ul className="cast-list">
            {cast.map((member) => (
              <li key={member.id} className="cast-member">
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

        <div className="similar-movies">
          <h3>Similar Shows</h3>
          <div className="movies-grid">
            {similarShows.map((show) => (
              <MovieCard movie={show} key={show.id} />
            ))}
          </div>
        </div>

        <div className="recommended-movies">
          <h3>Recommended Shows</h3>
          <div className="movies-grid">
            {recommendedShows.map((show) => (
              <MovieCard movie={show} key={show.id} />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default TVDetails;
