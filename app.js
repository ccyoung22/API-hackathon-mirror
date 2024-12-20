import express from "express";
import bodyParser from "body-parser";
import { getMovies, getMovieById, getMovieTitle } from "./config.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

//listen for a request
app.get("/", async function (req, res) {
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
app.get("/:id", async function (req, res) {
  try {
    // grab the id from the user querey paramaeter
    const id = parseInt(req.params.id);
    // search and grab the movie based on the id provided
    const movie = await getMovieById(id);
    // return the slected movie
    res.json(movie);
  } catch (error) {
    // throw error if the movie was not found
    res.status(404).json({
      message: error.message
    });
  }
});

app.get("/:title", async function (req, res) {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: "Title query parameter is required" });
    }
    const movie = await getMovieTitle(title);
    res.json(movie);
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
