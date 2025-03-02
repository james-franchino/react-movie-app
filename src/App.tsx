import { useState } from "react";
import { movies, getAllGenres } from "./components/movieData";
import Sidebar from "./components/Sidebar";
import ItemList from "./components/ItemList";
import "./App.css";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter movies based on selected genre and search term
  const filteredMovies = movies.filter((movie) => {
    // Filter by genre if one is selected
    const genreMatch = selectedGenre
      ? movie.genre.includes(selectedGenre)
      : true;

    // Filter by search term
    const searchMatch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase());

    return genreMatch && searchMatch;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Movie Explorer</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>
      <div className="main-content">
        <Sidebar
          genres={getAllGenres()}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
        />
        <ItemList movies={filteredMovies} />
      </div>
    </div>
  );
}
export default App;
