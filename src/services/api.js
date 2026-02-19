import axios from 'axios';

const API_KEY = 'c762846940323d43d64d1d4d0a3f2170';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Adapter to transform TMDB data to our App's expected format (OMDB-like)
const transformMovie = (tmdbItem) => {
    if (!tmdbItem) return null;

    const isSeries = tmdbItem.media_type === 'tv' || tmdbItem.first_air_date;

    return {
        imdbID: tmdbItem.id.toString(), // Using TMDB ID as ID
        Title: tmdbItem.title || tmdbItem.name,
        Year: (tmdbItem.release_date || tmdbItem.first_air_date || '').split('-')[0],
        Poster: tmdbItem.poster_path ? `${IMAGE_BASE_URL}${tmdbItem.poster_path}` : 'N/A',
        Type: isSeries ? 'series' : 'movie',
        Plot: tmdbItem.overview,
        Rated: 'PG-13', // Placeholder as TMDB certification logic is complex
        Runtime: 'N/A', // Requires detail fetch
        Genre: 'Entertainment', // Requires detailed genre mapping
        // Additional fields for details
        Backdrop: tmdbItem.backdrop_path ? `${BACKDROP_BASE_URL}${tmdbItem.backdrop_path}` : null,
        Rating: tmdbItem.vote_average ? tmdbItem.vote_average.toFixed(1) : 'N/A'
    };
};

export const searchMovies = async (query, type = '') => {
    try {
        if (!query) return [];

        let endpoint = '/search/multi';
        if (type === 'movie') endpoint = '/search/movie';
        if (type === 'series') endpoint = '/search/tv';

        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                query: query,
                page: 1
            }
        });

        if (response.data.results) {
            return response.data.results
                .map(transformMovie)
                .filter(movie => movie.Poster !== 'N/A'); // Filter out items without posters
        }
        return [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
};

export const getMovieDetails = async (id) => {
    try {
        // We need to guess if it's movie or tv since internal IDs might overlap or we just have an ID.
        // However, our App architecture passes 'type' poorly. 
        // Strategy: Try Movie first, if 404, try TV. Or store type in ID?
        // For simplicity in this migration, we'll try movie first.

        let data;
        let isSeries = false;

        try {
            const response = await axios.get(`${BASE_URL}/movie/${id}`, { params: { api_key: API_KEY } });
            data = response.data;
        } catch {
            // If movie fails, try TV
            try {
                const response = await axios.get(`${BASE_URL}/tv/${id}`, { params: { api_key: API_KEY } });
                data = response.data;
                isSeries = true;
            } catch {
                return null;
            }
        }

        if (data) {
            const transformed = transformMovie({ ...data, media_type: isSeries ? 'tv' : 'movie' });
            // Enhance with more details if needed
            transformed.Genre = data.genres ? data.genres.map(g => g.name).join(', ') : 'N/A';
            transformed.Runtime = data.runtime ? `${data.runtime} min` : (data.episode_run_time?.[0] ? `${data.episode_run_time[0]} min` : 'N/A');
            return transformed;
        }
        return null;

    } catch (error) {
        console.error('Error getting movie details:', error);
        return null;
    }
};

export const getMoviesByGenre = async (genre, type = '', page = 1) => {
    // TMDB uses Discover for genres or similar functionality.
    // Mapping keywords to TMDB Discover/Search for better results.

    const genreMapMovie = {
        'Action': 28,
        'Sci-Fi': 878,
        'Drama': 18,
        'Comedy': 35,
        'Horror': 27,
        'Romance': 10749,
        'Thriller': 53
    };

    const genreMapTV = {
        'Action': 10759, // Action & Adventure
        'Sci-Fi': 10765, // Sci-Fi & Fantasy
        'Drama': 18,
        'Comedy': 35,
        'Animation': 16,
        'Crime': 80,
        'Mystery': 9648
    };

    if (genre === 'Trending') {
        try {
            const endpoint = type === 'series' ? '/trending/tv/week' : '/trending/movie/week';
            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                params: {
                    api_key: API_KEY,
                    page: page
                }
            });
            return response.data.results.map(item => transformMovie({ ...item, media_type: type === 'series' ? 'tv' : 'movie' }));
        } catch { return []; }
    }

    const mapToUse = type === 'series' ? genreMapTV : genreMapMovie;

    // If it's a known genre ID
    if (mapToUse[genre]) {
        try {
            const endpoint = type === 'series' ? '/discover/tv' : '/discover/movie';
            const response = await axios.get(`${BASE_URL}${endpoint}`, {
                params: {
                    api_key: API_KEY,
                    with_genres: mapToUse[genre],
                    page: page
                }
            });
            return response.data.results.map(item => transformMovie({ ...item, media_type: type === 'series' ? 'tv' : 'movie' }));
        } catch { return []; }
    }

    // Fallback to search if it's a specific keyword like "Star Wars"
    return await searchMovies(genre, type); // Search doesn't support page in this adapter yet, but typically grid uses genres
};

export const getMovieVideos = async (id, type = 'movie') => {
    try {
        const response = await axios.get(`${BASE_URL}/${type}/${id}/videos`, {
            params: { api_key: API_KEY }
        });

        const videos = response.data.results;
        // Find a Trailer, preferably from YouTube
        const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') ||
            videos.find(v => v.site === 'YouTube');

        if (trailer) {
            return `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
        }
        return null;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return null; // Fallback or handle error
    }
};
