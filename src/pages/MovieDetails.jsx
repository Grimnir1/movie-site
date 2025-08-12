import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById, fetchMovieVideos, fetchMovieCredits, fetchSimilarMovies, fetchRecommendedMovies } from "../services/api";
import "../css/MovieDetails.css";
import MovieCard from "../Components/MovieCard";
import Loading from "../Components/Loading";
import CastCard from "../Components/CastCard";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovie = async () => {
            setLoading(true);
            try {
                const data = await fetchMovieById(id);
                setMovie(data);

                const videos = await fetchMovieVideos(id);
                const officialTrailer = videos.find(
                    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                );
                setTrailer(officialTrailer);

                const credits = await fetchMovieCredits(id);
                setCast(credits.cast.slice(0, 15));
                setCrew(credits.crew.filter(member => 
                    member.job === "Director" || member.job === "Producer" || member.job === "Writer"
                ).slice(0, 5));

                const similarMovies = await fetchSimilarMovies(id);
                setSimilarMovies(similarMovies.slice(0, 8));
                const recommendedMovies = await fetchRecommendedMovies(id);
                setRecommendedMovies(recommendedMovies.slice(0, 8));
                
            } catch (error) {
                console.error("Error loading movie data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    if (loading) return <Loading />;

    if (!movie) return <div className="error-message">Movie not found</div>;

    return (
        <div className="movie-details-container">
            <div className="movie-header">
                <div className="poster-section">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                        onError={(e) => {
                            e.target.src = '/placeholder-poster.jpg'; // Add fallback image
                        }}
                    />
                </div>

                <div className="info-section">
                    <h1 className="movie-title">{movie.title}</h1>
                    <p className="release-year">Release Year: {movie.release_date?.split("-")[0]}</p>
                    <p className="overview">{movie.overview}</p>

                    <div className="movie-meta">
                        <div className="meta-item">
                            <strong>Rating:</strong> {movie.vote_average?.toFixed(1)} ⭐
                        </div>
                        <div className="meta-item">
                            <strong>Language:</strong> {movie.original_language?.toUpperCase()}
                        </div>
                        <div className="meta-item">
                            <strong>Runtime:</strong> {movie.runtime} minutes
                        </div>
                        <div className="meta-item">
                            <strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}
                        </div>
                        <div className="meta-item">
                            <strong>Production Companies:</strong> {movie.production_companies?.map(c => c.name).join(", ")}
                        </div>
                        <div className="meta-item">
                            <strong>Production Countries:</strong> {movie.production_countries?.map(c => c.name).join(", ")}
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