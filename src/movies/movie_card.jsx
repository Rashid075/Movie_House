import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, handleMovieClick, handleToggleFavorites, isFavorite }) => {
  return (
    <div
      key={movie.id}
      className='relative bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105'
      onClick={() => handleMovieClick(movie.id)}
    >
      {/* Favorites Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorites(movie);
        }}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isFavorite ? 'bg-red-600' : 'bg-gray-700'
        } text-white hover:bg-opacity-80 transition duration-300 text-2xl`}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className='w-full h-64 object-cover'
      />
      <div className='p-4'>
        <h2 className='text-xl font-semibold text-gray-100'>{movie.title}</h2>
        <p className='text-gray-400'>{movie.release_date}</p>
        <p className='text-gray-300 mt-2'>{movie.overview}</p>
        <p className='text-yellow-400 mt-2 font-semibold'>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
