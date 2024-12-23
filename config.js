import { data } from "./database.js";

let Movies = data.map((title) => ({ ...title }));
export async function getMovies() {
  return data;
}

export async function getMovieById(id) {
  try {
    const movie = data.find((movie) => movie.id === id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMovieTitle(search) {
  const lowercased = search.toLowerCase();
  return Movies.filter(({ title }) => {
    return title.toLowerCase().includes(lowercased);
  });
}

export async function getMovieByGenre(search) {
  const searchLower = search.toLowerCase();
  const filteredMovies = Movies.filter(function (movie) {
    return movie.genres.toLowerCase().includes(searchLower);
  });
  return filteredMovies;
}
