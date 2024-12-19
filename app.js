//import express to use as framework
import express, { request } from "express";

//import database
//import { data } from "./database.js" //with { type: "json"};

//define port
const PORT = 3000;

//import functions
import { getMovies } from "./config.js";

//create our express server
const app = express();

//create a middle man to parse and make it available under req.body
app.use(express.json());

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
//listen for request
//access database
//process request
//generate response
app.listen(PORT, ()=>{
  console.log("Server is running on http://localhost:3000")
})
