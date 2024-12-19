//import express to use as framework
import express, { request } from "express";

//define port
const PORT = 3000;

//import functions
import { getMovies } from "config.js";

//create our express server
const app = express();

//create a middle man to parse and make it available under req.body
app.use(express.json());

//export the app so it can be used in other files
export default app;

//listen for request
//access database
//process request
//generate response
