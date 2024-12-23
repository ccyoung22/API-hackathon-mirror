import express from "express";
//This is saying import what we will name express from "express" - which is our framework (but we could call in anything, express just makes the most sense)
import bodyParser from "body-parser";
//this is saying import what we will call bodyParser from "body-Parser" which is the framework
import {
  getMovies,
  getMovieById,
  getMovieTitle,
  getMovieByGenre,
} from "./config.js";

const PORT = 3000;
//saying we want to listen on port 3000
const app = express();
//declaring the variable of app and calling express with this variable

app.use(express.json());
//telling express app to use express.json to read and convert incoming requests to an object
app.use(bodyParser.json());
//telling express to use bodyParser.json to read and convert incoming json bodies into useable js objects

//listen for a request
app.get("/", async function (req, res) {
  //using method .get to tell our app (which is express) that when get is called to run this, first the path then the anonymous function
  try {
    // access the database and grab all the movies
    const movieList = await getMovies();
    // return the list of movies with all info
    res.json(movieList);
  } catch (error) {
    // throw error if user is unable to find the database
    res.status(404).json({
      message: error.message,
    });
  }
});

//listen for a request by id
app.get("/id/:id", async function (req, res) {
  try {
    // grab the id from the user querey paramaeter
    const id = parseInt(req.params.id);
    // search and grab the movie based on the id provided. this specifies that we want to convert the req(input request), parameters of id, into a useable number (from a string)
    const movie = await getMovieById(id);
    // return the selected movie (using the imported function of getMovieById and giving it the parameter of id that we defined above)
    res.json(movie);
  } catch (error) {
    // throw error if the movie was not found
    res.status(404).json({
      message: error.message,
    });
  }
});

app.get("/title/:title", async function (req, res) {
  try {
    const { title } = req.params;
    if (!title) {
      // !title meaning they did not input the title
      return res.status(400).json({ message: "Title parameter is required" });
    }
    const movie = await getMovieTitle(title);
    //creating a varible with the name movie and asking it to use the imported getMovieTitle function with the parameter of our title varibale we created above
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
      //this error is sent if the movie is not found but the request is okay- the movie doesnt exist in the database
    }
    res.json(movie); // Send a single movie
  } catch (error) {
    res.status(500).json({
      message: error.message,
      //this error would be sent if there was a problem in the request or the funtion
    });
  }
});

app.get("/genres/:genres", async function (req, res) {
  try {
    const genres = req.params.genres;
    if (!genres) {
      return res.status(400).json({ message: "Genre input is required" });
    }
    const movies = await getMovieByGenre(genres);
    if (!movies) {
      return res
        .status(404)
        .json({ message: "No movies found under specified genre" });
    }
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

export default app;
