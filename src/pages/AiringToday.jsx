import { getAiringTodayTv, getUpcomingMovies, getNowPlayingMovies } from "../services/api"
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import TVCard from "../Components/TvCard";
import MovieCard from "../Components/MovieCard";
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


    return(
        <div>
            {loading ? (
                    <Loading />
                ) : error ? (
                    <Error error={error} />
                ) : (
                <div>
                    <div className="movie-class">
                        <h2>Upcoming Movies</h2>
                        <div className="movies-grid">
                            {
                                upcomingMovies.map((movies) => (
                                    <MovieCard movie={movies} key={movies.id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="movie-class">
                        <h2>Tv Shows Airing Today</h2>
                        <div className="movies-grid">
                            {airingToday.map((movie) => (
                                <TVCard movie={movie} key={movie.id} />
                            ))}
                        </div>  
                    </div>
                    <div className="movie-class">
                        <h2>Now Playing</h2>
                        <div className="movies-grid">
                            {
                                nowPlayingMovies.map((movies) => (
                                    <MovieCard movie={movies} key={movies.id} />
                                ))
                            }
                        </div>
                    </div>


                </div>
            )}
            
        </div>
    )
}

export default AiringToday