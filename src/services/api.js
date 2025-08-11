const API_KEY = "29fd15b153e5ae33b7efd72942acbd5c";
const API_URL = "https://api.themoviedb.org/3";

// Get popular movies
export const getPopularMovies = async () => {
  const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Get top-rated movies
export const getTopRatedMovies = async () => {
  const response = await fetch(`${API_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Get tv shows
export const getTvShows = async () => {
  const response = await fetch(`${API_URL}/tv/top_rated?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}
// Search for movies
export const searchPopularMovies = async (query) => {
  const response = await fetch(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};

// Fetch detailed info for a single movie
export const fetchMovieById = async (id) => {
  const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const fetchMovieVideos = async (id) => {
  const response = await fetch(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const fetchMovieCredits = async (id) => {
  const response = await fetch(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// Fetch similar movies
export const fetchSimilarMovies = async (id) => {
  const response = await fetch(`${API_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Fetch recommended movies
export const fetchRecommendedMovies = async (id) => {
  const response = await fetch(`${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};


export const fetchTvById = async (id) => {
  const response = await fetch(`${API_URL}/tv/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const fetchTvVideos = async (id) => {
  const response = await fetch(`${API_URL}/tv/${id}/videos?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const fetchTvCredits = async (id) => {
  const response = await fetch(`${API_URL}/tv/${id}/credits?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const fetchSimilarTvShows = async (id) => {
  const response = await fetch(`${API_URL}/tv/${id}/similar?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const fetchRecommendedTvShows = async (id) => {
  const response = await fetch(`${API_URL}/tv/${id}/recommendations?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const getUpcomingMovies = async () => {
  const response = await fetch(`${API_URL}/movie/upcoming?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};
export const getAiringTodayTv = async () => {
  const response = await fetch(`${API_URL}/tv/airing_today?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};
export const getNowPlayingMovies = async () => {
  const response = await fetch(`${API_URL}/movie/now_playing?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};