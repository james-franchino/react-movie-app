import { useState, useEffect } from "react";
import { Movie } from "./movieData";

interface MovieFormProps {
  movie?: Movie | null;
  onSave: (movie: Partial<Movie>) => void;
  onCancel: () => void;
}

// Helper to create a blank movie form data
const createEmptyMovie = (): Partial<Movie> => ({
  title: "",
  director: "",
  year: new Date().getFullYear(),
  genre: [],
  rating: 0,
  runtime: 90,
  poster: "src/assets/new_movie.png",
  description: "",
});

function MovieForm({ movie, onSave, onCancel }: MovieFormProps) {
  // If movie is provided, we're editing, otherwise creating new
  const [formData, setFormData] = useState<Partial<Movie>>(
    movie ? { ...movie } : createEmptyMovie(),
  );

  // Genre input management
  const [genreInput, setGenreInput] = useState("");

  // Reset form when the movie prop changes
  useEffect(() => {
    setFormData(movie ? { ...movie } : createEmptyMovie());
  }, [movie]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Special handling for rating and runtime (number types)
    if (name === "rating" || name === "runtime") {
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddGenre = () => {
    if (genreInput.trim() && formData.genre) {
      // Don't add duplicate genres
      if (!formData.genre.includes(genreInput.trim())) {
        setFormData({
          ...formData,
          genre: [...formData.genre, genreInput.trim()],
        });
      }
      setGenreInput("");
    }
  };

  const handleRemoveGenre = (genreToRemove: string) => {
    if (formData.genre) {
      setFormData({
        ...formData,
        genre: formData.genre.filter((g) => g !== genreToRemove),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="movie-form">
      <form onSubmit={handleSubmit} style={{ maxHeight: "100%" }}>
        <div className="form-header">
          <h2>{movie ? "Edit Movie" : "Add New Movie"}</h2>
          <button type="button" className="close-button" onClick={onCancel}>
            &times;
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.year}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (0-10)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="10"
              step="0.1"
              value={formData.rating}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="runtime">Runtime (minutes)</label>
            <input
              type="number"
              id="runtime"
              name="runtime"
              min="1"
              value={formData.runtime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="poster">Poster URL</label>
          <input
            type="text"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre-input">Genres</label>
          <div className="genre-input-container">
            <input
              type="text"
              id="genre-input"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
              placeholder="Add a genre"
            />
            <button
              type="button"
              className="add-genre-btn"
              onClick={handleAddGenre}
            >
              Add
            </button>
          </div>

          {formData.genre && formData.genre.length > 0 && (
            <div className="genre-tags">
              {formData.genre.map((g) => (
                <span key={g} className="genre-tag editable">
                  {g}
                  <button
                    type="button"
                    className="remove-genre"
                    onClick={() => handleRemoveGenre(g)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            {movie ? "Update Movie" : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
