import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchTvById,
  fetchTvVideos,
  fetchTvCredits,
  fetchSimilarTvShows,
  fetchRecommendedTvShows,
  fetchTvWatchProviders,
  fetchTvExternalIds
} from "../services/api";
import "../css/MovieDetails.css";
import TvCard from "../Components/TvCard";
import Loading from "../Components/Loading";
import CastCard from "../Components/CastCard";

function TVDetails() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchProviders, setWatchProviders] = useState(null);
  const [externalIds, setExternalIds] = useState({ imdb_id: null });

  useEffect(() => {
    const loadTV = async () => {
      setLoading(true);
      try {
        const data = await fetchTvById(id);
        setTv(data);

        const videos = await fetchTvVideos(id);
        const officialTrailer = videos.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(officialTrailer);

        const credits = await fetchTvCredits(id);
        setCast(credits.cast.slice(0, 15));
        setCrew(
          credits.crew
            .filter(
              (member) =>
                member.job === "Director" ||
                member.job === "Producer" ||
                member.job === "Writer" ||
                member.job === "Creator" ||
                member.job === "Executive Producer"
            )
            .slice(0, 5)
        );

        const similar = await fetchSimilarTvShows(id);
        setSimilarShows(similar.slice(0, 8));

        const recommended = await fetchRecommendedTvShows(id);
        setRecommendedShows(recommended.slice(0, 8));

        // Fetch watch providers and external IDs
        const providers = await fetchTvWatchProviders(id);
        setWatchProviders(providers);

        const ids = await fetchTvExternalIds(id);
        setExternalIds(ids);
      } catch (error) {
        console.error("Error loading TV show data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTV();
  }, [id]);

  if (loading) return <Loading />;

  if (!tv) return <div className="error-message">TV show not found</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-header">
        <div className="poster-section">
          <img
            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
            alt={tv.name}
            className="movie-poster"
            onError={(e) => {
              e.target.src = '/placeholder-poster.jpg';
            }}
          />
        </div>

        <div className="info-section">
          <h1 className="movie-title">{tv.name}</h1>
          <p className="release-year">
            First Air Date: {tv.first_air_date?.split("-")[0]}
          </p>
          {tv.last_air_date && tv.status === "Ended" && (
            <p className="release-year">
              Last Air Date: {tv.last_air_date?.split("-")[0]}
            </p>
          )}
          <p className="overview">{tv.overview}</p>

          <div className="movie-meta">
            <div className="meta-item">
              <strong>Rating:</strong> {tv.vote_average?.toFixed(1)} ⭐
            </div>
            <div className="meta-item">
              <strong>Language:</strong> {tv.original_language?.toUpperCase()}
            </div>
            <div className="meta-item">
              <strong>Episode Runtime:</strong> {tv.episode_run_time?.[0] || "N/A"} minutes
            </div>
            <div className="meta-item">
              <strong>Seasons:</strong> {tv.number_of_seasons}
            </div>
            <div className="meta-item">
              <strong>Episodes:</strong> {tv.number_of_episodes}
            </div>
            <div className="meta-item">
              <strong>Status:</strong> {tv.status}
            </div>
            <div className="meta-item">
              <strong>Genres:</strong> {tv.genres?.map((g) => g.name).join(", ")}
            </div>
            <div className="meta-item">
              <strong>Networks:</strong> {tv.networks?.map((n) => n.name).join(", ")}
            </div>
            <div className="meta-item">
              <strong>Production Companies:</strong> {tv.production_companies?.map((c) => c.name).join(", ")}
            </div>
            <div className="meta-item">
              <strong>Production Countries:</strong> {tv.origin_country?.join(", ")}
            </div>

            {/* Watch Providers */}
            {watchProviders && (
              <div className="watch-providers">
                <strong>Where to Watch:</strong>
                <div className="provider-list">
                  {watchProviders.flatrate?.length > 0 && (
                    <div className="provider-category">
                      <span>Stream:</span>
                      <div className="providers">
                        {watchProviders.flatrate.map((provider) => (
                          <img
                            key={provider.provider_id}
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            title={provider.provider_name}
                            className="provider-logo"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {watchProviders.buy?.length > 0 && (
                    <div className="provider-category">
                      <span>Buy/Rent:</span>
                      <div className="providers">
                        {watchProviders.buy.map((provider) => (
                          <img
                            key={provider.provider_id}
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            title={provider.provider_name}
                            className="provider-logo"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* External Ratings */}
            <div className="external-ratings">
              {externalIds.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${externalIds.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rating-link"
                >
                  <img
                    src="/imdb-logo.png"
                    alt="IMDb"
                    className="rating-logo"
                  />
                  View on IMDb
                </a>
              )}
              {tv.vote_average > 0 && (
                <div className="rating">
                  <span className="rating-label">TMDB Rating:</span>
                  <span className="rating-value">{tv.vote_average.toFixed(1)}/10</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="trailer-section">
          <h3>Watch Trailer</h3>
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="cast-crew-section">
        <div className="cast-section">
          <h3>Cast</h3>
          <div className="cast-list movie-scroll-container">
            {cast.map((member) => (
              <CastCard member={member} key={member.id} />
            ))}
          </div>
        </div>

        <div className="crew-section">
          <h3>Crew</h3>
          <div className="crew-list movie-scroll-container">
            {crew.map((member) => (
              <div key={member.id} className="crew-member">
                <img
                  src={member.profile_path 
                    ? `https://image.tmdb.org/t/p/w185${member.profile_path}` 
                    : '/placeholder-avatar.jpg'
                  }
                  alt={member.name}
                  className="crew-photo"
                  onError={(e) => {
                    e.target.src = '/placeholder-avatar.jpg';
                  }}
                />
                <div className="crew-info">
                  <p className="crew-name">{member.name}</p>
                  <p className="crew-job">{member.job}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recommendations-section">
        <div className="similar-movies">
          <h3>Similar Shows</h3>
          <div className="movies-grid movie-scroll-container">
            {similarShows.map((show) => (
              <TvCard movie={show} key={show.id} />
            ))}
          </div>
        </div>

        <div className="recommended-movies">
          <h3>Recommended Shows</h3>
          <div className="movies-grid movie-scroll-container">
            {recommendedShows.map((show) => (
              <TvCard movie={show} key={show.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TVDetails;