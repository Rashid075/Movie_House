import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const MovieDialog = ({ selectedMovie, handleCloseDialog }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70'>
      <div className='bg-gray-800 p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 scale-100 opacity-100 animate__animated animate__fadeIn'>
        <button
          onClick={handleCloseDialog}
          className='absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition duration-300'
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className='text-2xl font-semibold mb-4'>{selectedMovie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          className='w-full h-64 object-cover mb-4'
        />
        <div className='overflow-y-auto max-h-96'>
          <p className='text-gray-300 mb-4'>{selectedMovie.overview}</p>
          <p className='text-gray-400 mb-4'>Release Date: {selectedMovie.release_date}</p>
          <p className='text-gray-400 mb-4'>Rating: {selectedMovie.vote_average}</p>
          <h3 className='text-xl font-semibold mb-2'>Cast:</h3>
          <ul>
            {selectedMovie.credits.cast.slice(0, 5).map((cast) => (
              <li key={cast.cast_id} className='mb-1 text-gray-300'>{cast.name} as {cast.character}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDialog;
