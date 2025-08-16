const API_KEY = "29fd15b153e5ae33b7efd72942acbd5c";
const API_URL = "https://api.themoviedb.org/3";

// Get popular movies
export const getPopularMovies = async () => {
  const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const getPopularTvShows = async () => {
  const response = await fetch(`${API_URL}/tv/popular?api_key=${API_KEY}`);
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
  try {
    const response = await fetch(
      `${API_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.sort((a, b) => b.popularity - a.popularity);
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error; // Re-throw to allow error handling where the function is called
  }
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
  return data.results.sort((a, b) => b.popularity - a.popularity);
};

// Fetch recommended movies
export const fetchRecommendedMovies = async (id) => {
  const response = await fetch(`${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results.sort((a, b) => b.popularity - a.popularity);
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
  return data.results.sort((a, b) => b.popularity - a.popularity);
};

export const fetchRecommendedTvShows = async (id) => {
  const response = await fetch(`${API_URL}/tv/${id}/recommendations?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results.sort((a, b) => b.popularity - a.popularity);
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

export const getNowPlayingTv = async () => {
  const response = await fetch(`${API_URL}/tv/now_playing?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};


export const fetchRecommendedAnime = async () => {
  try {
    // Method 1: Discover TV shows with Animation genre (genre id 16)
    const response = await fetch(
      `${API_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&language=en-US&with_origin_country=JP`
    );
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if data and results exist
    if (!data || !data.results) {
      throw new Error('Invalid response structure');
    }
    
    return data.results;
    
  } catch (error) {
    console.error('Error fetching recommended anime:', error);
    throw error; 
  }
};
export const fetchRecommendedKdrama = async () => {
  try {
    const response = await fetch(
      `${API_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_origin_country=KR`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.results) {
      throw new Error('Invalid response structure');
    }
    
    return data.results;
    
  } catch (error) {
    console.error('Error fetching recommended kdrama:', error);
    throw error; 
  }
};


export const fetchRecommendedNollywood = async () => {
  try {
    const response = await fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_origin_country=NG`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.results) {
      throw new Error('Invalid response structure');
    }
    
    return data.results;
    
  } catch (error) {
    console.error('Error fetching recommended nollywood:', error);
    throw error; 
  }
};

export const fetchRecommendedHollywood = async () => {
  try {
    const response = await fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_origin_country=US`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.results) {
      throw new Error('Invalid response structure');
    }
    
    return data.results;
    
  } catch (error) {
    console.error('Error fetching recommended hollywood:', error);
    throw error; 
  }
};

export const fetchRecommendedCdrama = async () => {
  try {
    const response = await fetch(
      `${API_URL}/discover/tv?api_key=${API_KEY}&language=en-US&with_origin_country=CN`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.results) {
      throw new Error('Invalid response structure');
    }
    
    return data.results;
    
  } catch (error) {
    console.error('Error fetching recommended cdrama:', error);
    throw error; 
  }
};

// Get watch providers for a TV show
export const fetchTvWatchProviders = async (tvId) => {
  try {
    const response = await fetch(
      `${API_URL}/tv/${tvId}/watch/providers?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results?.US || null; // Return US providers or null if not available
  } catch (error) {
    console.error('Error fetching TV watch providers:', error);
    return null;
  }
};

// Get watch providers for a movie
export const fetchMovieWatchProviders = async (movieId) => {
  try {
    const response = await fetch(
      `${API_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results?.US || null; // Return US providers or null if not available
  } catch (error) {
    console.error('Error fetching watch providers:', error);
    return null;
  }
};

// Get external IDs for a TV show including IMDb ID
export const fetchTvExternalIds = async (tvId) => {
  try {
    const response = await fetch(
      `${API_URL}/tv/${tvId}/external_ids?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV external IDs:', error);
    return { imdb_id: null };
  }
};

// Get external IDs including IMDb ID
export const fetchMovieExternalIds = async (movieId) => {
  try {
    const response = await fetch(
      `${API_URL}/movie/${movieId}/external_ids?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching external IDs:', error);
    return { imdb_id: null };
  }
};