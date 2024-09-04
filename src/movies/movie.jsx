import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './movie_card';
import MovieDialog from './movie_dialog';

const Movie = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [noResults, setNoResults] = useState(false); 
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: { api_key: '8b10a322ddf1cf635c8604c48ef70304' },
        });
        setGenre(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: '8b10a322ddf1cf635c8604c48ef70304',
            sort_by: sortBy,
            with_genres: selectedGenre,
            query: search,
            page: 1,
          },
        });
        setMovies(response.data.results);
        setNoResults(response.data.results.length === 0 && search.trim() !== '');
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [search, sortBy, selectedGenre]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: { api_key: '8b10a322ddf1cf635c8604c48ef70304', query },
        });
        setSuggestions(response.data.results);
        setNoResults(response.data.results.length === 0 && query.trim() !== '');
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
      setNoResults(false);
    }
  };

  const handleSort = (e) => setSortBy(e.target.value);
  const handleGenre = (e) => setSelectedGenre(e.target.value);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: { api_key: '8b10a322ddf1cf635c8604c48ef70304', query: search },
      });
      setMovies(response.data.results);
      setSuggestions([]); // Clear suggestions after search submit
      setNoResults(response.data.results.length === 0 && search.trim() !== '');
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleMovieClick = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: '8b10a322ddf1cf635c8604c48ef70304',
          append_to_response: 'credits',
        },
      });
      setSelectedMovie(response.data);
      setSuggestions([]); // Clear suggestions when a movie is selected
      setNoResults(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleCloseDialog = () => setSelectedMovie(null);

  const handleToggleFavorites = (movie) => {
    const updatedFavorites = favorites.some((fav) => fav.id === movie.id)
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleShowFavorites = () => setShowFavorites(!showFavorites);

  return (
    <div className='bg-gray-900 min-h-screen text-gray-100'>
      <h1 className='text-center text-6xl p-10 text-blue-400 font-bold drop-shadow-lg'>MovieHouse</h1>
      <div className='flex flex-col items-center'>
        {/* Search Bar */}
        <div className='w-full max-w-md mb-5'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search movies...'
              className='w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-l-xl py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300'
              value={search}
              onChange={handleSearch}
            />
            <button
              className='absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300'
              onClick={handleSearchSubmit}
            >
              Search
            </button>
            {/* Auto-suggestion dropdown */}
            {suggestions.length > 0 && (
              <div className='absolute w-full bg-gray-800 border border-gray-700 mt-1 rounded-lg z-10'>
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className='p-2 cursor-pointer hover:bg-gray-700'
                    onClick={() => handleMovieClick(suggestion.id)}
                  >
                    {suggestion.title}
                  </div>
                ))}
              </div>
            )}
            {/* No Results Message */}
            {noResults && (
              <div className='absolute w-full bg-gray-800 border border-gray-700 p-2 rounded-lg z-10 text-center text-gray-400'>
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>

        {/* Sort By and Genre Dropdowns */}
        <div className='flex flex-wrap justify-center space-x-4 mb-5'>
          <div className='mb-2'>
            <label htmlFor='sort' className='sr-only'>Sort By:</label>
            <select
              id='sort'
              className='border border-gray-700 bg-gray-800 text-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300'
              value={sortBy}
              onChange={handleSort}
            >
              <option value='popularity.desc'>Sort by Popularity</option>
              <option value='vote_average.desc'>Sort by Rating</option>
              <option value='release_date.desc'>Sort by Release Date</option>
            </select>
          </div>
          <div className='mb-2'>
            <label htmlFor='genre' className='sr-only'>Genre</label>
            <select
              id='genre'
              className='border border-gray-700 bg-gray-800 text-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300'
              value={selectedGenre}
              onChange={handleGenre}
            >
              <option value=''>Select Genre</option>
              {genre.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Favorites Button */}
        <button
          className='mb-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
          onClick={handleShowFavorites}
        >
          {showFavorites ? 'Show All Movies' : 'Show Favorites'}
        </button>

        {/* Movie Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4'>
          {(showFavorites ? favorites : movies).length > 0 ? (
            (showFavorites ? favorites : movies).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleMovieClick={handleMovieClick}
                handleToggleFavorites={handleToggleFavorites}
                isFavorite={favorites.some((fav) => fav.id === movie.id)}
              />
            ))
          ) : noResults ? (
            <p className='text-center text-gray-400 col-span-full text-5xl p-5'>No movies to display</p>
          ) : null}
        </div>
      </div>

      {/* Movie Detail Dialog */}
      {selectedMovie && (
        <MovieDialog
          selectedMovie={selectedMovie}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default Movie;
