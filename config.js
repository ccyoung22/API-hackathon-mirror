//import the data
import { data } from "./database.json";

export async function getMovies() {
  return data;
}

//create a export async function
//that grabs the whole data list
//and returns it
