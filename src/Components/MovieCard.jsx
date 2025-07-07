import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';
import { Link } from "react-router-dom";
 

function MovieCard({movie}){

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
        <Link to={`/movie/${movie.id}`} className="movie-link">
            <div className="movie-card">
                
                    <div className="movie-poster">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.url} />
                        <div className="movie-overlay">
                            <button className={`favorite-btn ${favourites ? 'active' : ''}`} onClick={onLike}>
                                🤍
                            </button>
                        </div>
                    </div>
                    <div className="movie-info">
                        <h3>{movie.title}</h3> 
                        <p>{movie.release_date?.split('-')[0]}</p>
                        {/* <p>{movie.overview}</p> */}
                        {/* <p>Rating: {movie.vote_average}</p>
                        <p>Popularity: {Math.round(movie.popularity)}</p>
                        <p>Vote Count: {movie.vote_count}</p>
                        
                        <p>Language: {movie.original_language.toUpperCase()}</p>
                        <p>Adult: {movie.adult ? 'Yes' : 'No'}</p>
                        <p>Original Title: {movie.original_title}</p> */}
                        {/* <p>Original Language: {movie.original_language}</p> */}
                        {/* <p>Production Companies: {movie.production_companies.map((company) => company.name).join(', ')}</p>
                        <p>Production Countries: {movie.production_countries.map((country) => country.name).join(', ')}</p> */}
                    </div>
                </div>
        </Link>
            )
}

export default MovieCard