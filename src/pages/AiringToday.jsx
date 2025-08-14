import { getAiringTodayTv, getUpcomingMovies, getNowPlayingMovies } from "../services/api"
import { useEffect, useState } from "react";
import Error from "../Components/Error";
import TVCard from "../Components/TvCard";
import MovieCard from "../Components/MovieCard";
import MovieCardSkeleton from "../Components/MovieCardSkeleton";

function AiringToday() {
    const [airingToday, setAiringToday] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAiringToday = async () => {
            setLoading(true);
            try {
                const airingToday = await getAiringTodayTv();
                setAiringToday(airingToday.slice(0, 10));

                const upcomingMovies = await getUpcomingMovies();
                setUpcomingMovies(upcomingMovies.slice(0, 10));

                const nowPlayingMovies = await getNowPlayingMovies();
                setNowPlayingMovies(nowPlayingMovies.slice(0, 10));

                setError(null);

            } catch (error) {
                console.error(error);
                setError("Failed to fetch airing today TV shows.");
            } finally {
                setLoading(false);
            }
        }
        loadAiringToday();
    }, []);

    const renderSkeletons = (count) => {
        return Array(count).fill(0).map((_, index) => (
            <MovieCardSkeleton key={`skeleton-${index}`} />
        ));
    };

    return (
        <div className="airing-today">
            {error ? (
                <Error error={error} />
            ) : (
                <>
                    <div className="movie-class">
                        <h1>Airing Today</h1>
                        <div className="movies-grid">
                            {loading 
                                ? renderSkeletons(10)
                                : airingToday.map((show) => (
                                    <TVCard key={show.id} movie={show} />
                                ))}
                        </div>
                    </div>

                    <div className="movie-class">   
                        <h1>Upcoming Movies</h1>
                        <div className="movies-grid">
                            {loading 
                                ? renderSkeletons(10)
                                : upcomingMovies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} type="movie" />
                                ))}
                        </div>
                    </div>

                    <div className="movie-class">   
                        <h1>Now Playing</h1>
                        <div className="movies-grid">
                            {loading 
                                ? renderSkeletons(10)
                            : nowPlayingMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} type="movie" />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default AiringToday