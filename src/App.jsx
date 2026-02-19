import React, { useState, useEffect } from 'react';
import { searchMovies, getMovieDetails, getMovieVideos, getMoviesByGenre } from './services/api';
import Sidebar from './components/Sidebar';
import FilmBoxHero from './components/FilmBoxHero';
import MovieCard from './components/MovieCard';
import MovieRow from './components/MovieRow';
import VideoModal from './components/VideoModal';
import MovieInfoModal from './components/MovieInfoModal';
import { Search, User, Bell } from 'lucide-react';
import Auth from './components/Auth';
import Settings from './components/Settings';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Skeleton from './components/Skeleton';
import FloatingParticles from './components/FloatingParticles';
import './index.css';

function App() {
  const [user, setUser] = useState(null); // Auth state
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

  const [activeView, setActiveView] = useState('home'); // home, grid, favorites, settings
  const [activeTab, setActiveTab] = useState('Movies'); // Movies, Series, TV Shows

  // Data State
  const [heroMovie, setHeroMovie] = useState(null);
  const [categories, setCategories] = useState({});
  const [gridContent, setGridContent] = useState([]);
  const [gridPage, setGridPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Hero Carousel State
  const [heroCandidates, setHeroCandidates] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  // UI Polish States
  const [isScrolled, setIsScrolled] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Theme Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Scroll Header Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    const username = (userData && userData.email) ? userData.email.split('@')[0] : 'User';
    showToast('Welcome back, ' + username + '!', 'success');
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (heroCandidates.length <= 1) return;

    const intervalId = setInterval(() => {
      setHeroIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % heroCandidates.length;
        return nextIndex;
      });
    }, 15000); // 15 seconds

    return () => clearInterval(intervalId);
  }, [heroCandidates]);

  // Effect to update displayed hero when index changes
  useEffect(() => {
    const updateHero = async () => {
      if (heroCandidates.length > 0) {
        const candidate = heroCandidates[heroIndex];
        const details = await getMovieDetails(candidate.imdbID);
        setHeroMovie(details);
      }
    };
    updateHero();
  }, [heroIndex, heroCandidates]);

  const loadGridContent = async (page) => {
    setIsLoadingMore(true);

    const [popMovies, popSeries, actionMovies, dramaSeries] = await Promise.all([
      getMoviesByGenre('Trending', '', page),
      getMoviesByGenre('Trending', 'series', page),
      getMoviesByGenre('Action', '', page),
      getMoviesByGenre('Drama', 'series', page)
    ]);

    const combined = [...popMovies, ...popSeries, ...actionMovies, ...dramaSeries];
    const unique = Array.from(new Map(combined.map(item => [item.imdbID, item])).values());

    setGridContent(unique);
    setIsLoadingMore(false);
  };

  const loadContent = async () => {
    setIsSearching(true); // Re-using this as "is loading home content" effectively
    let categoryData = {};

    // 1. Hero Content - Fetch Trending Movies for Carousel
    const heroTrending = await getMoviesByGenre('Trending');
    if (heroTrending && heroTrending.length > 0) {
      const candidates = heroTrending.slice(0, 10);
      setHeroCandidates(candidates);
      const details = await getMovieDetails(candidates[0].imdbID);
      setHeroMovie(details);
    } else {
      const batmans = await searchMovies('The Batman');
      if (batmans && batmans.length > 0) {
        setHeroCandidates([batmans[0]]);
        const details = await getMovieDetails(batmans[0].imdbID);
        setHeroMovie(details);
      }
    }

    setHeroCandidates(prev => {
      if (prev.length < 2) {
        const hardcodedCandidates = [
          { imdbID: 'tt1877830', Title: 'The Batman', Poster: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg', Backdrop: 'https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5Bmxkq7QvDSW.jpg' },
          { imdbID: 'tt0499549', Title: 'Avatar', Poster: 'https://image.tmdb.org/t/p/original/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', Backdrop: 'https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jX9uaE.jpg' },
          { imdbID: 'tt1375666', Title: 'Inception', Poster: 'https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', Backdrop: 'https://image.tmdb.org/t/p/original/s3TBrRGB1jav7fwSaGj7s8lad2h.jpg' },
          { imdbID: 'tt10872600', Title: 'Spider-Man: No Way Home', Poster: 'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4GY0d.jpg', Backdrop: 'https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnts5n4.jpg' }
        ];
        return hardcodedCandidates;
      }
      return prev;
    });

    if (activeTab === 'Movies') {
      const [trending, topRated, action, comedy, horror, scifi] = await Promise.all([
        getMoviesByGenre('Trending'),
        getMoviesByGenre('Trending'),
        getMoviesByGenre('Action'),
        getMoviesByGenre('Comedy'),
        getMoviesByGenre('Horror'),
        getMoviesByGenre('Sci-Fi')
      ]);

      categoryData = {
        'Trending Now': trending.slice(0, 15),
        'Top Picks for You': topRated.slice(5, 20),
        'Action Blockbusters': action,
        'Comedy Hits': comedy,
        'Sci-Fi Adventures': scifi,
        'Chilling Horror': horror
      };
    } else {
      const [popular, action, animation, comedy, scifi] = await Promise.all([
        getMoviesByGenre('Trending', 'series'),
        getMoviesByGenre('Action', 'series'),
        getMoviesByGenre('Animation', 'series'),
        getMoviesByGenre('Comedy', 'series'),
        getMoviesByGenre('Sci-Fi', 'series')
      ]);
      categoryData = {
        'Top Rated Series': popular,
        'Action & Adventure': action,
        'Binge-Worthy Animation': animation,
        'Sitcoms & Comedy': comedy,
        'Sci-Fi & Fantasy': scifi
      };
    }

    setCategories(categoryData);
    setIsSearching(false);
  };

  useEffect(() => {
    if (activeView === 'home') {
      loadContent();
    } else if (activeView === 'grid') {
      if (gridContent.length === 0) loadGridContent(1);
    }
  }, [activeTab, activeView]);

  const handlePageChange = (page) => {
    if (page === gridPage) return;
    setGridPage(page);
    loadGridContent(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleSelectMovie = async (id) => {
    // For Hero Selection (maybe separate this logic later if needed)
    const details = await getMovieDetails(id);
    setSelectedMovie(details);
    setShowInfoModal(true);
  };

  const handleHeroSelect = async (id) => {
    const details = await getMovieDetails(id);
    setHeroMovie(details);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      setActiveView('search'); // Switch to search view
      if (results.length > 0) {
        const details = await getMovieDetails(results[0].imdbID);
        setHeroMovie(details);
      }
    }
  };

  const toggleFavorite = (movie) => {
    if (favorites.some(f => f.imdbID === movie.imdbID)) {
      setFavorites(favorites.filter(f => f.imdbID !== movie.imdbID));
      showToast(`Removed "${movie.Title}" from favorites`, 'info');
    } else {
      setFavorites([...favorites, movie]);
      showToast(`Added "${movie.Title}" to favorites`, 'success');
    }
  };

  const handleWatch = async (movie) => {
    if (!movie || !movie.imdbID) return;
    const url = await getMovieVideos(movie.imdbID, movie.Type === 'series' ? 'tv' : 'movie');
    if (url) {
      setTrailerUrl(url);
      setShowModal(true);
    } else {
      showToast('Trailer not found for this title.', 'error');
    }
  };

  const updateView = (view) => {
    setActiveView(view);
    // Only scroll to top if switching views, not just re-rendering
    if (view !== activeView) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const executeLogout = () => {
    setUser(null);
    setActiveView('home');
    setShowLogoutConfirm(false);
    showToast('Signed out successfully.', 'info');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleHeaderUserClick = () => {
    setActiveView('settings');
  };

  const handleHeaderBellClick = () => {
    showToast('No new notifications.', 'info');
  };

  if (!user) {
    return (
      <>
        <div className="aurora-bg" />
        <FloatingParticles />
        <Auth onLogin={handleLogin} />
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10000 }}>
          {toasts.map(toast => (
            <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="app-container" style={styles.app}>
      <div className="aurora-bg" />
      <FloatingParticles />

      {/* Toast Container */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10000 }}>
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
        ))}
      </div>

      <Sidebar
        activeView={activeView}
        onNavigate={updateView}
        onLogout={confirmLogout}
      />

      <div className="main-content" style={styles.main}>
        {/* Dynamic Header */}
        <div className={`header ${isScrolled ? 'scrolled' : ''} `} style={styles.header}>
          <div style={styles.tabs}>
            <span
              style={activeTab === 'Movies' ? styles.tabActive : styles.tab}
              onClick={() => { setActiveTab('Movies'); setActiveView('home'); }}
            >
              Movies
            </span>
            <span
              style={activeTab === 'Series' ? styles.tabActive : styles.tab}
              onClick={() => { setActiveTab('Series'); setActiveView('home'); }}
            >
              Series
            </span>
            <span
              style={activeTab === 'TV Shows' ? styles.tabActive : styles.tab}
              onClick={() => { setActiveTab('TV Shows'); setActiveView('home'); }}
            >
              TV Shows
            </span>
          </div>

          <div style={styles.headerRight}>
            <form onSubmit={handleSearch} style={styles.searchForm}>
              <div style={styles.searchIconWrapper}>
                <Search size={16} color="white" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div style={styles.iconBtn} onClick={handleHeaderBellClick}>
              <Bell size={20} />
              <div style={styles.notificationDot} />
            </div>

            <div style={{ ...styles.avatar, cursor: 'pointer' }} onClick={handleHeaderUserClick}>
              <User size={20} />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        {activeView === 'home' && (
          <FilmBoxHero
            movie={heroMovie}
            onPlay={() => handleWatch(heroMovie)}
            onToggleFavorite={() => toggleFavorite(heroMovie)}
            isFavorite={heroMovie && favorites.some(f => f.imdbID === heroMovie.imdbID)}
            totalItems={heroCandidates.length}
            currentIndex={heroIndex}
            onDotClick={setHeroIndex}
          />
        )}

        {/* Settings Section */}
        {activeView === 'settings' && (
          <div style={styles.contentSection}>
            <Settings
              theme={theme}
              toggleTheme={toggleTheme}
              user={user}
              onLogout={confirmLogout}
            />
          </div>
        )}

        {/* Content Section */}
        {activeView !== 'settings' && (
          <div style={{ ...styles.contentSection, marginTop: activeView === 'home' ? '-100px' : '100px', position: 'relative', zIndex: 20 }}>

            {/* Search View */}
            {activeView === 'search' && (
              <div style={styles.containerPadding}>
                <h2 style={styles.sectionTitle}>
                  {searchResults.length > 0 ? `Search Results for "${searchQuery}"` : `Searching for "${searchQuery}"...`}
                </h2>
                <div style={styles.grid}>
                  {searchResults.map(movie => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={handleSelectMovie}
                      onPlay={handleWatch}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.some(f => f.imdbID === movie.imdbID)}
                    />
                  ))}
                </div>
                {searchResults.length === 0 && !isSearching && (
                  <p style={{ color: '#666' }}>No results found.</p>
                )}
              </div>
            )}

            {/* Home View - Categories (Rows) */}
            {activeView === 'home' && !isSearching && (
              <div>
                {/* Skeletons if loading categories */}
                {Object.keys(categories).length === 0 ? (
                  <div style={styles.containerPadding}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ marginBottom: '40px' }}>
                        <Skeleton width="200px" height="30px" style={{ marginBottom: '20px' }} />
                        <div style={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
                          {[1, 2, 3, 4, 5, 6].map(j => (
                            <Skeleton key={j} width="180px" height="270px" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  Object.entries(categories).map(([title, movies]) => (
                    <MovieRow
                      key={title}
                      title={title}
                      movies={movies}
                      onSelect={handleSelectMovie}
                      onPlay={handleWatch}
                      onToggle={toggleFavorite}
                      favorites={favorites}
                    />
                  ))
                )}
              </div>
            )}

            {/* Favorites View */}
            {activeView === 'favorites' && (
              <div style={styles.containerPadding}>
                <h2 style={styles.sectionTitle}>My Favorites</h2>
                <div style={styles.grid}>
                  {favorites.length > 0 ? favorites.map(movie => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={handleSelectMovie}
                      onPlay={handleWatch}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={true}
                    />
                  )) : <p style={{ color: '#666' }}>No favorites yet.</p>}
                </div>
              </div>
            )}

            {/* Profile View (Same layout as Favorites/Grid but empty for now) */}
            {activeView === 'profile' && (
              <div style={styles.containerPadding}>
                <h2 style={styles.sectionTitle}>My Profile</h2>
                <p style={{ color: '#666' }}>Profile details coming soon. Check Settings.</p>
              </div>
            )}


            {/* Grid View - Discover */}
            {activeView === 'grid' && (
              <div style={styles.containerPadding}>
                <h2 style={styles.sectionTitle}>Discover Movies & Series</h2>
                <div style={styles.grid}>
                  {gridContent.length > 0 ? gridContent.map(movie => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={handleSelectMovie}
                      onPlay={handleWatch}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.some(f => f.imdbID === movie.imdbID)}
                    />
                  )) : (
                    // Skeleton Loading for Grid
                    Array(10).fill(0).map((_, i) => (
                      <Skeleton key={i} width="100%" height="280px" />
                    ))
                  )}
                </div>

                {gridContent.length === 0 && !isLoadingMore && !activeView === 'grid' && <p style={{ color: '#666', textAlign: 'center' }}>Loading catalog...</p>}

                <div style={styles.pagination}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      style={gridPage === page ? styles.pageBtnActive : styles.pageBtn}
                      disabled={isLoadingMore}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {/* Footer */}
        {activeView !== 'settings' && activeView !== 'search' && (
          <Footer />
        )}
      </div>

      {showModal && (
        <VideoModal url={trailerUrl} onClose={() => setShowModal(false)} />
      )}

      {showInfoModal && (
        <MovieInfoModal
          movie={selectedMovie}
          onClose={() => setShowInfoModal(false)}
          onPlay={handleWatch}
          onToggleFavorite={toggleFavorite}
          isFavorite={selectedMovie && favorites.some(f => f.imdbID === selectedMovie.imdbID)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ color: 'white', marginBottom: '10px', fontSize: '1.5rem' }}>Sign Out</h3>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>Do you want to sign out?</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={cancelLogout}
                style={{
                  padding: '12px 30px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                No
              </button>
              <button
                onClick={executeLogout}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#E50914',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
    fontFamily: 'var(--font-main)',
  },
  main: {
    marginLeft: '80px',
    flex: 1,
    position: 'relative',
    overflowX: 'hidden',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: '24px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
  },
  tabs: {
    display: 'flex',
    gap: '40px',
    fontSize: '0.95rem',
    color: '#aaa',
    fontWeight: '600',
  },
  tabActive: {
    color: '#fff',
    cursor: 'pointer',
    textShadow: '0 0 10px rgba(255,255,255,0.5)',
  },
  tab: {
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
  searchForm: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIconWrapper: {
    position: 'absolute',
    left: '12px',
    zIndex: 1,
    pointerEvents: 'none',
  },
  searchInput: {
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '30px',
    padding: '8px 15px 8px 35px',
    color: 'white',
    outline: 'none',
    width: '240px',
    fontSize: '0.9rem',
    transition: 'all 0.3s',
    backdropFilter: 'blur(5px)',
  },
  iconBtn: {
    position: 'relative',
    color: '#fff',
    cursor: 'pointer',
  },
  notificationDot: {
    position: 'absolute',
    top: '-2px',
    right: '-1px',
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--filmbox-red)',
    borderRadius: '50%',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(255,255,255,0.1)',
  },
  contentSection: {
    paddingBottom: '60px',
    minHeight: '500px',
  },
  containerPadding: {
    padding: '40px 60px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    marginBottom: '30px',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '30px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '50px',
    flexWrap: 'wrap',
  },
  pageBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#aaa',
    border: 'none',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnActive: {
    backgroundColor: 'var(--filmbox-red)',
    color: 'white',
    border: 'none',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px rgba(229, 9, 20, 0.5)',
  }
};

export default App;
