interface SidebarProps {
  genres: string[];
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

function Sidebar({ genres, selectedGenre, onGenreSelect }: SidebarProps) {
  return (
    <div className="sidebar">
      <h2>Genres</h2>
      <ul className="genre-list">
        <li
          className={selectedGenre === null ? "active" : ""}
          onClick={() => onGenreSelect(null)}
        >
          All Genres
        </li>
        {genres.map((genre) => (
          <li
            key={genre}
            className={selectedGenre === genre ? "active" : ""}
            onClick={() => onGenreSelect(genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
      <div className="sidebar-info">
        <h3>About</h3>
        <p>
          Explore our collection of classic and modern films. Filter by genre or
          search for your favorites.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
