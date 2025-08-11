import { getAiringTodayTv, getUpcomingMovies, getNowPlayingMovies } from "../services/api"
import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import TVCard from "../Components/TvCard";
import MovieCard from "../Components/MovieCard";
function AiringToday() {
    const [airingToday, setAiringToday] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadAiringToday = async () => {
            setLoading(true);
            try {
                const response = await getAiringTodayTv();
                setAiringToday(response.slice(0, 10));
            } catch (error) {
                console.error(error);
                setError("Failed to fetch airing today TV shows.");
            } finally {
                setLoading(false);
            }
        }
        loadAiringToday();


        const upcomingMovies = async () => {
            setLoading(true);
            try {
                const response = await getUpcomingMovies();
                setUpcomingMovies(response.slice(0, 10));
            } catch (error) {
                console.error(error);
                setError("Failed to fetch upcoming movies.");
            } finally {
                setLoading(false);
            }
        }
        upcomingMovies();
    }, []);


    return(
        <div>
            {loading ? (
                    <Loading />
                ) : error ? (
                    <Error error={error} />
                ) : (
                <div>
                    <div>
                        <h2>Upcoming Movies</h2>
                        <div className="movies-grid">
                            {
                                upcomingMovies.map((movies) => (
                                    <MovieCard movie={movies} key={movies.id} />
                                ))
                            }
                        </div>
                    </div>
                    <div >
                        <h2>Tv Shows Airing Today</h2>
                        <div className="movies-grid">
                            {airingToday.map((movie) => (
                                <TVCard movie={movie} key={movie.id} />
                            ))}
                        </div>  
                    </div>
                    


                </div>
            )}
            
        </div>
    )
}

export default AiringToday