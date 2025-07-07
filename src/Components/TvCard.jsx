import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';
import { Link } from "react-router-dom";
 

function TvCard({movie}){

    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
    const favourites = isFavorite(movie.id);
    function onLike(e) {
        e.preventDefault();
        if (favourites) {
            removeFromFavorites(movie.id);
        }else {
            addToFavorites(movie);
        }
    }

    return  (
        <Link to={`/tv/${movie.id}`} className="movie-link">
            <div className="movie-card">
                
                    <div className="movie-poster">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.name} />
                        <div className="movie-overlay">
                            <button className={`favorite-btn ${favourites ? 'active' : ''}`} onClick={onLike}>
                                🤍
                            </button>
                        </div>
                    </div>
                    <div className="movie-info">
                        <h3>{movie.name}</h3> 
                        <p>{movie.first_air_date?.split('-')[0]}</p>
                    </div>
                </div>
        </Link>
            )
}

export default TvCard