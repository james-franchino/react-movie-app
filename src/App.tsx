import { useState, useEffect } from "react";
import {
  getAllGenres,
  movies as initialMovies,
  Movie,
} from "./components/movieData";
import Sidebar from "./components/Sidebar";
import ItemList from "./components/ItemList";
import Modal from "./components/Modal";
import MovieForm from "./components/MovieForm";
import "./App.css";

function App() {
  // State for movies and filtering
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // State for modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Calculate all genres when movies change
  useEffect(() => {
    const allGenres = getAllGenres();
    setGenres(allGenres);
  }, [movies]);

  // Handle genre selection
  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter movies based on selected genre and search term
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre
      ? movie.genre.includes(selectedGenre)
      : true;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  // Open modal to add a new movie
  const handleAddMovie = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  // Open modal to edit an existing movie
  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  // Handle saving a movie (create or update)
  const handleSaveMovie = (movieData: Partial<Movie>) => {
    if (editingMovie) {
      // Update existing movie
      setMovies(
        movies.map((m) =>
          m.id === editingMovie.id ? ({ ...m, ...movieData } as Movie) : m,
        ),
      );
    } else {
      // Create new movie with a new ID
      const newMovie = {
        ...movieData,
        id: Math.max(...movies.map((m) => m.id)) + 1,
      } as Movie;
      setMovies([...movies, newMovie]);
    }

    // Close modal after saving
    setIsModalOpen(false);
  };

  // Handle deleting a movie
  const handleDeleteMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Movie Collection</h1>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="add-movie-btn" onClick={handleAddMovie}>
            Add Movie
          </button>
        </div>
      </div>

      <div className="main-content">
        <Sidebar
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreSelect={handleGenreSelect}
        />

        <ItemList
          movies={filteredMovies}
          onEdit={handleEditMovie}
          onDelete={handleDeleteMovie}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MovieForm
          movie={editingMovie}
          onSave={handleSaveMovie}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
