import { useState } from "react";
import { Movie } from "./movieData";

interface ItemCardProps {
  movie: Movie;
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

function ItemCard({ movie, onDelete, onToggleFavorite }: ItemCardProps) {
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

  // Handle delete without event propagation
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    onDelete(movie.id);
  };

  // Handle favorite toggle without event propagation
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    onToggleFavorite(movie.id);
  };

  return (
    <div className="item-card" onClick={toggleDetails}>
      <div className="movie-poster">
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="movie-rating">{movie.rating.toFixed(1)}</div>

        {/* Favorite icon - conditionally styled */}
        <div
          className={`favorite-icon ${movie.favorite ? "favorite" : ""}`}
          onClick={handleFavoriteToggle}
        >
          ★
        </div>
      </div>
      <div className="movie-info">
        <div className="movie-header">
          <h3 className="movie-title">{movie.title}</h3>
          <button className="delete-button" onClick={handleDelete}>
            ×
          </button>
        </div>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
