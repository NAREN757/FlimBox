import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
//  SMART API CLIENT — auto-selects the right backend based on where it's hosted
//
//  ┌─────────────────────┬─────────────────────────────────────────────────┐
//  │ Environment         │ Strategy                                        │
//  ├─────────────────────┼─────────────────────────────────────────────────┤
//  │ Vercel (prod/prev.) │ /api/tmdb serverless function (our proxy)       │
//  │ GitHub Pages        │ corsproxy.io public CORS proxy                  │
//  │ Local (vite dev)    │ Direct TMDB (VPN needed) or vercel dev          │
//  └─────────────────────┴─────────────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

const API_KEY = 'c762846940323d43d64d1d4d0a3f2170';
const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

// ── Environment detection ────────────────────────────────────────────────────
const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
const IS_VERCEL = hostname.includes('vercel.app') || hostname.includes('vercel.com');
const IS_GITHUB_PAGES = hostname.includes('github.io');

/**
 * Build a URL + params object based on the current environment.
 * @param {string} tmdbPath  e.g. "/trending/movie/week"
 * @param {object} extra     extra query params (query, page, with_genres…)
 */
function buildRequest(tmdbPath, extra = {}) {
  if (IS_VERCEL) {
    // Vercel serverless proxy — browser hits /api/tmdb, Vercel calls TMDB
    return {
      url: '/api/tmdb',
      params: { path: tmdbPath, ...extra },
    };
  }

  if (IS_GITHUB_PAGES) {
    // Public CORS proxy — routes request through corsproxy.io
    const tmdbUrl = `${TMDB_BASE}${tmdbPath}?api_key=${API_KEY}&${new URLSearchParams(extra).toString()}`;
    return {
      url: `https://corsproxy.io/?${encodeURIComponent(tmdbUrl)}`,
      params: {},
    };
  }

  // Local dev — direct TMDB (use VPN or `vercel dev`)
  return {
    url: `${TMDB_BASE}${tmdbPath}`,
    params: { api_key: API_KEY, ...extra },
  };
}

// ── Data transformer ─────────────────────────────────────────────────────────
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
    Rating: tmdbItem.vote_average ? tmdbItem.vote_average.toFixed(1) : 'N/A',
  };
};

// ── searchMovies ─────────────────────────────────────────────────────────────
export const searchMovies = async (query, type = '') => {
  try {
    if (!query) return [];
    let path = '/search/multi';
    if (type === 'movie') path = '/search/movie';
    if (type === 'series') path = '/search/tv';

    const { url, params } = buildRequest(path, { query, page: 1 });
    const response = await axios.get(url, { params });

    if (response.data.results) {
      return response.data.results
        .map(transformMovie)
        .filter((m) => m && m.Poster !== 'N/A');
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
      const { url, params } = buildRequest(`/movie/${id}`);
      const res = await axios.get(url, { params });
      data = res.data;
    } catch {
      try {
        const { url, params } = buildRequest(`/tv/${id}`);
        const res = await axios.get(url, { params });
        data = res.data;
        isSeries = true;
      } catch {
        return null;
      }
    }

    if (data) {
      const transformed = transformMovie({ ...data, media_type: isSeries ? 'tv' : 'movie' });
      transformed.Genre = data.genres ? data.genres.map((g) => g.name).join(', ') : 'N/A';
      transformed.Runtime = data.runtime
        ? `${data.runtime} min`
        : data.episode_run_time?.[0]
        ? `${data.episode_run_time[0]} min`
        : 'N/A';
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
    Horror: 27, Romance: 10749, Thriller: 53,
  };
  const genreMapTV = {
    Action: 10759, 'Sci-Fi': 10765, Drama: 18, Comedy: 35,
    Animation: 16, Crime: 80, Mystery: 9648,
  };

  if (genre === 'Trending') {
    try {
      const path = type === 'series' ? '/trending/tv/week' : '/trending/movie/week';
      const { url, params } = buildRequest(path, { page });
      const res = await axios.get(url, { params });
      return res.data.results.map((item) =>
        transformMovie({ ...item, media_type: type === 'series' ? 'tv' : 'movie' })
      );
    } catch { return []; }
  }

  const mapToUse = type === 'series' ? genreMapTV : genreMapMovie;
  if (mapToUse[genre]) {
    try {
      const path = type === 'series' ? '/discover/tv' : '/discover/movie';
      const { url, params } = buildRequest(path, { with_genres: mapToUse[genre], page });
      const res = await axios.get(url, { params });
      return res.data.results.map((item) =>
        transformMovie({ ...item, media_type: type === 'series' ? 'tv' : 'movie' })
      );
    } catch { return []; }
  }

  return await searchMovies(genre, type);
};

// ── getMovieVideos ───────────────────────────────────────────────────────────
export const getMovieVideos = async (id, type = 'movie') => {
  try {
    const { url, params } = buildRequest(`/${type}/${id}/videos`);
    const res = await axios.get(url, { params });
    const videos = res.data.results;

    const trailer =
      videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
      videos.find((v) => v.site === 'YouTube');

    return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1` : null;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return null;
  }
};
