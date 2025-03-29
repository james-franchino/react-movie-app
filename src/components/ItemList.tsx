import { Movie } from "./movieData";
import ItemCard from "./ItemCard";

interface ItemListProps {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

function ItemList({ movies, onEdit, onDelete }: ItemListProps) {
  return (
    <div className="item-list">
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <ItemCard
              key={movie.id}
              movie={movie}
              onEdit={onEdit}
              onDelete={onDelete}
            />
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
