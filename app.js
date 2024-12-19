//import express to use as framework
import express from "express";

//import body parser module
import bodyParser from "body-parser";

//import database
//import { data } from "./database.js" //with { type: "json"};

//define port
const PORT = 3000;

//import functions
import { getMovies, getMovieTitle } from "./config.js";

//create our express server
const app = express();

//create a middle man to parse and make it available under req.body
app.use(express.json());

app.use(bodyParser.json());

//export the app so it can be used in other files
export default app;

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

//listen for a query parameter of a title
//take the title
//give that to our get movie title function
//respond with movie list

app.get("/:title", async function (req, res) {
  try {
    const { title } = req.query;
    console.log(title);
    const movieList = await getMovieTitle(title);
    res.json(movieList);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//listen for request
//access database
//process request
//generate response
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
