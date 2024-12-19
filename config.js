//import the data
import { data } from "./database.js";

export async function getMovies() {
  return data;
}

//create a export async function
//that grabs the whole data list
//and returns it

//Request by Title
//listen for request (titles)
export async function getMovieTitle(search) {
  const lowercase = search.toLowerCase();
  return data.filter(({ title }) => {
    return title.toLowerCase().includes(lowercase);
  });
}
//Access the database
//grab the data by title
//process data
//return data
