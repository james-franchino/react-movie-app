import { Movie } from "./movieData";
import ItemCard from "./ItemCard";

interface ItemListProps {
  movies: Movie[];
  onDelete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

function ItemList({ movies, onDelete, onToggleFavorite }: ItemListProps) {
  return (
    <div className="item-list">
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <ItemCard
                key={movie.id}
                movie={movie}
                onDelete={onDelete}
                onToggleFavorite={onToggleFavorite}/>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No movies found</h3>
          <p>
            Try changing your search criteria or selecting a different genre.
          </p>
        </div>
      )}
    </div>
  );
}

export default ItemList;
