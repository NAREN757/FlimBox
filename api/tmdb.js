// Vercel Serverless Function — TMDB Proxy
// All browser requests hit /api/tmdb?path=...&params...
// This function forwards them to api.themoviedb.org from Vercel's servers,
// completely bypassing ISP-level blocks on the client side.

const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'c762846940323d43d64d1d4d0a3f2170';

export default async function handler(req, res) {
  // Allow CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract the TMDB path from query param, e.g. /api/tmdb?path=/trending/movie/week
  const { path, ...rest } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  // Build TMDB URL with the api_key injected + any extra query params
  const params = new URLSearchParams({ api_key: TMDB_API_KEY, ...rest });
  const tmdbUrl = `${TMDB_BASE}${path}?${params.toString()}`;

  try {
    const tmdbRes = await fetch(tmdbUrl);
    const data = await tmdbRes.json();

    // Forward TMDB status code
    res.status(tmdbRes.status).json(data);
  } catch (err) {
    console.error('TMDB Proxy Error:', err);
    res.status(502).json({ error: 'Failed to reach TMDB API', details: err.message });
  }
}
