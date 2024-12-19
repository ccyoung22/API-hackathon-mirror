import express from "express";
import bodyParser from "body-parser";
import { getMovies, getMovieById, getMovieTitle } from "./config.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get("/", async function (req, res) {
  try {
    const movieList = await getMovies();
    res.json(movieList);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

app.get("/:id", async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    const movie = await getMovieById(id);
    res.json(movie);
  } catch (error) {
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
