export type Movie = {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string[];
  rating: number;
  runtime: number; // In minutes
  poster: string;
  description: string;
};

// Sample movie data
export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    runtime: 148,
    poster: "https://via.placeholder.com/150x225?text=Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
    genre: ["Drama"],
    rating: 9.3,
    runtime: 142,
    poster: "https://via.placeholder.com/150x225?text=Shawshank",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    runtime: 152,
    poster: "https://via.placeholder.com/150x225?text=Dark+Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    runtime: 154,
    poster: "https://via.placeholder.com/150x225?text=Pulp+Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 5,
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    year: 1994,
    genre: ["Drama", "Romance"],
    rating: 8.8,
    runtime: 142,
    poster: "https://via.placeholder.com/150x225?text=Forrest+Gump",
    description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
  },
  {
    id: 6,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    runtime: 136,
    poster: "https://via.placeholder.com/150x225?text=The+Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
];

// Function to get all unique genres from movie data
export const getAllGenres = (): string[] => {
  const genreSet = new Set<string>();

  movies.forEach((movie) => {
    movie.genre.forEach((genre) => {
      genreSet.add(genre);
    });
  });

  return Array.from(genreSet).sort();
};
