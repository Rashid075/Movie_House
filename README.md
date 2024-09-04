# MovieHouse

## Project Overview

MovieHouse is a movie search application that allows users to search for movies, view movie details, add movies to a favorites list, and filter and sort movies based on various criteria. The application integrates with The Movie Database (TMDb) API to provide movie data and offers features such as:


- **Search**: Find movies based on search queries.
- **Favorites**: Add movies to a favorites list and view them later.
- **Sorting**: Sort movies by popularity, rating, or release date.
- **Genre Filtering**: Filter movies based on selected genres.
- **Responsive Design**: View the app on different screen sizes.

## Instructions to Set Up and Run the Project Locally

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later) or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/moviehouse.git
cd moviehouse


Install Dependencies

npm install
# or
yarn install


Run the Application

npm start
# or
yarn start


The application will start and be accessible at http://localhost:5173.

API Usage Details
This project uses the TMDb API to fetch movie data. The following endpoints are used:

Genres: GET https://api.themoviedb.org/3/genre/movie/list
Discover Movies: GET https://api.themoviedb.org/3/discover/movie
Search Movies: GET https://api.themoviedb.org/3/search/movie
Movie Details: GET https://api.themoviedb.org/3/movie/{movie_id}
The API key is required to make requests to these endpoints.


Screenshots
Desktop View

Tablet View

Mobile View

Approach

In this project, we implemented a React application to provide a user-friendly interface for searching and managing movies. The core features include searching movies, adding movies to favorites, filtering by genres, and sorting by various criteria. The app's responsiveness ensures it works well across different devices, and data persistence is handled using local storage for the favorites list.