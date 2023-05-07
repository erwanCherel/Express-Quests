require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my users list");
};

// movies
const movieHandlers = require("./movieHandlers");
app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies/:id", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);

// validateMovie
const { validateMovie } = require("./validateMovie.js");
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies", validateMovie, movieHandlers.postMovie);

// users
const userHandlers = require("./userHandlers");
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users/:id", userHandlers.postUser);
app.put("/api/users/:id", userHandlers.updateUser);

// validateUser
const { validateUser } = require("./validateUser.js");
app.post("/api/users", validateUser, userHandlers.postUser);
app.put("/api/users", validateUser, userHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
