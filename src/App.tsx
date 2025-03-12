import React, { useState } from "react";
import { Movie, movies, getAllGenres } from "./components/movieData.ts";
import Sidebar from "./components/Sidebar.tsx";
import ItemList from "./components/ItemList.tsx";
import "./App.css";

function App() {
  // Move test data into state
  const [movieList, setMovieList] = useState<Movie[]>(movies);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle genre selection
  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  // Function to handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Implement create functionality
  const handleAddMovie = () => {
    // Create a new movie with default data
    const newMovie: Movie = {
      id:
        movieList.length > 0
          ? Math.max(...movieList.map((movie) => movie.id)) + 1
          : 1,
      title: "New Movie",
      director: "Director Name",
      year: 2025,
      genre: ["Drama"],
      rating: 7.5,
      runtime: 120,
      poster: "src/assets/new_movie.png", // Make sure this exists or use a placeholder
      description: "This is a placeholder description for the new movie.",
      favorite: false, // Adding a new property for Task 4
    };

    // Update state with a copy of the array plus the new movie
    setMovieList([...movieList, newMovie]);
  };

  // Implement delete functionality
  const handleDeleteMovie = (id: number) => {
    // Update state with a copy of the array minus the deleted movie
    setMovieList(movieList.filter((movie) => movie.id !== id));
  };

  // Implement update functionality (toggle favorite)
  const handleToggleFavorite = (id: number) => {
    // Update state with a copy of the array with the updated movie
    setMovieList(
      movieList.map((movie) =>
        movie.id === id ? { ...movie, favorite: !movie.favorite } : movie,
      ),
    );
  };

  // Filter movies based on selected genre and search term
  const filteredMovies = movieList.filter((movie) => {
    const matchesGenre = selectedGenre
      ? movie.genre.includes(selectedGenre)
      : true;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Movie Collection</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </header>

      <div className="main-content">
        <Sidebar
          genres={getAllGenres()}
          selectedGenre={selectedGenre}
          onGenreSelect={handleGenreSelect}
        />
        <div className="content-area">
          <div className="controls">
            <button className="add-button" onClick={handleAddMovie}>
              Add New Movie
            </button>
          </div>
          <ItemList
            movies={filteredMovies}
            onDelete={handleDeleteMovie}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
