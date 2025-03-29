import { useState } from "react";
import { Movie } from "./movieData";

interface ItemCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

function ItemCard({ movie, onEdit, onDelete }: ItemCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Convert runtime to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Prevent click event from bubbling up when clicking on action buttons
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="item-card" onClick={toggleDetails}>
      <div className="movie-poster">
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="movie-rating">{movie.rating.toFixed(1)}</div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-year">{movie.year}</div>

        {showDetails && (
          <div className="movie-details">
            <div className="movie-director">Director: {movie.director}</div>
            <div className="movie-runtime">
              Runtime: {formatRuntime(movie.runtime)}
            </div>
            <div className="movie-genres">
              {movie.genre.map((g) => (
                <span key={g} className="genre-tag">
                  {g}
                </span>
              ))}
            </div>
            <p className="movie-description">{movie.description}</p>

            <div className="movie-actions">
              <button
                className="edit-btn"
                onClick={(e) => handleActionClick(e, () => onEdit(movie))}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={(e) => handleActionClick(e, () => onDelete(movie.id))}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
