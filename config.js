import { data } from "./database.js";

export async function getMovies() {
  return data;
}

export async function getMovieById(id) {
  try {
    const movie = data.find(movie => movie.id === id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMovieTitle(title) {
  try {
    const movie = data.find(movie => movie.title.toLowerCase() === title.toLowerCase());
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  } catch (error) {
    throw new Error(error.message);
  }
}
