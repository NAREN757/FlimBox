import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
//  PROXY-BASED API CLIENT
//
//  Instead of calling TMDB directly from the browser (which gets blocked by
//  many ISPs), all requests go through our own proxy endpoint:
//
//  • On Vercel (production/preview):  /api/tmdb?path=<tmdb-path>&<params>
//    → handled by /api/tmdb.js serverless function on Vercel's servers
//
//  • In local dev with `vercel dev`: same URL, same function runs locally
//
//  • Fallback for plain `vite dev`:  hits TMDB directly (VPN required)
//
//  This means the browser never talks to api.themoviedb.org — Vercel does.
// ─────────────────────────────────────────────────────────────────────────────

const API_KEY = 'c762846940323d43d64d1d4d0a3f2170';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

// Detect environment:
//  - If we're on a real domain (Vercel / vercel dev), use the proxy
//  - If we're on localhost without the proxy (plain vite dev), go direct
const IS_VERCEL_ENV =
  typeof window !== 'undefined' &&
  (window.location.hostname !== 'localhost' ||
    import.meta.env.VITE_USE_PROXY === 'true');

/**
 * Build a URL that either goes through our /api/tmdb proxy
 * or directly to TMDB (plain local dev fallback).
 */
function buildUrl(path, extraParams = {}) {
  if (IS_VERCEL_ENV) {
    // Proxy: /api/tmdb?path=/trending/movie/week&page=1
    const params = new URLSearchParams({ path, ...extraParams });
    return { url: `/api/tmdb`, params: Object.fromEntries(params) };
  }
  // Direct fallback
  return {
    url: `https://api.themoviedb.org/3${path}`,
    params: { api_key: API_KEY, ...extraParams }
  };
}

// Adapter — transform TMDB shape → app's internal shape
const transformMovie = (tmdbItem) => {
  if (!tmdbItem) return null;
  const isSeries = tmdbItem.media_type === 'tv' || tmdbItem.first_air_date;
  return {
    imdbID: tmdbItem.id.toString(),
    Title: tmdbItem.title || tmdbItem.name,
    Year: (tmdbItem.release_date || tmdbItem.first_air_date || '').split('-')[0],
    Poster: tmdbItem.poster_path ? `${IMAGE_BASE_URL}${tmdbItem.poster_path}` : 'N/A',
    Type: isSeries ? 'series' : 'movie',
    Plot: tmdbItem.overview,
    Rated: 'PG-13',
    Runtime: 'N/A',
    Genre: 'Entertainment',
    Backdrop: tmdbItem.backdrop_path ? `${BACKDROP_BASE_URL}${tmdbItem.backdrop_path}` : null,
    Rating: tmdbItem.vote_average ? tmdbItem.vote_average.toFixed(1) : 'N/A'
  };
};

// ── searchMovies ─────────────────────────────────────────────────────────────
export const searchMovies = async (query, type = '') => {
  try {
    if (!query) return [];
    let path = '/search/multi';
    if (type === 'movie') path = '/search/movie';
    if (type === 'series') path = '/search/tv';

    const { url, params } = buildUrl(path, { query, page: 1 });
    const response = await axios.get(url, { params });

    if (response.data.results) {
      return response.data.results
        .map(transformMovie)
        .filter(movie => movie && movie.Poster !== 'N/A');
    }
    return [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// ── getMovieDetails ──────────────────────────────────────────────────────────
export const getMovieDetails = async (id) => {
  try {
    let data;
    let isSeries = false;

    try {
      const { url, params } = buildUrl(`/movie/${id}`);
      const response = await axios.get(url, { params });
      data = response.data;
    } catch {
      try {
        const { url, params } = buildUrl(`/tv/${id}`);
        const response = await axios.get(url, { params });
        data = response.data;
        isSeries = true;
      } catch {
        return null;
      }
    }

    if (data) {
      const transformed = transformMovie({ ...data, media_type: isSeries ? 'tv' : 'movie' });
      transformed.Genre = data.genres ? data.genres.map(g => g.name).join(', ') : 'N/A';
      transformed.Runtime = data.runtime
        ? `${data.runtime} min`
        : data.episode_run_time?.[0] ? `${data.episode_run_time[0]} min` : 'N/A';
      return transformed;
    }
    return null;
  } catch (error) {
    console.error('Error getting movie details:', error);
    return null;
  }
};

// ── getMoviesByGenre ─────────────────────────────────────────────────────────
export const getMoviesByGenre = async (genre, type = '', page = 1) => {
  const genreMapMovie = {
    Action: 28, 'Sci-Fi': 878, Drama: 18, Comedy: 35,
    Horror: 27, Romance: 10749, Thriller: 53
  };
  const genreMapTV = {
    Action: 10759, 'Sci-Fi': 10765, Drama: 18, Comedy: 35,
    Animation: 16, Crime: 80, Mystery: 9648
  };

  if (genre === 'Trending') {
    try {
      const path = type === 'series' ? '/trending/tv/week' : '/trending/movie/week';
      const { url, params } = buildUrl(path, { page });
      const response = await axios.get(url, { params });
      return response.data.results.map(item =>
        transformMovie({ ...item, media_type: type === 'series' ? 'tv' : 'movie' })
      );
    } catch { return []; }
  }

  const mapToUse = type === 'series' ? genreMapTV : genreMapMovie;

  if (mapToUse[genre]) {
    try {
      const path = type === 'series' ? '/discover/tv' : '/discover/movie';
      const { url, params } = buildUrl(path, { with_genres: mapToUse[genre], page });
      const response = await axios.get(url, { params });
      return response.data.results.map(item =>
        transformMovie({ ...item, media_type: type === 'series' ? 'tv' : 'movie' })
      );
    } catch { return []; }
  }

  return await searchMovies(genre, type);
};

// ── getMovieVideos ───────────────────────────────────────────────────────────
export const getMovieVideos = async (id, type = 'movie') => {
  try {
    const { url, params } = buildUrl(`/${type}/${id}/videos`);
    const response = await axios.get(url, { params });
    const videos = response.data.results;

    const trailer =
      videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') ||
      videos.find(v => v.site === 'YouTube');

    return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1` : null;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return null;
  }
};
