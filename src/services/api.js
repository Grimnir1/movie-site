const API_KEY = "29fd15b153e5ae33b7efd72942acbd5c";
const API_URL = "https://api.themoviedb.org/3";

// Get popular movies
export const getPopularMovies = async () => {
  const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

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

// Fetch videos (trailers, teasers, etc.) for a movie
export const fetchMovieVideos = async (id) => {
  const response = await fetch(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

// Fetch cast and crew for a movie
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
