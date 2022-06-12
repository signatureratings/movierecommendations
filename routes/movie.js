const app = require("express");
const movieRouter = app.Router();
//const {getMovieById, getMovieBytitle, updateMovie} = require("../models/movieModel");

movieRouter.get("/:id", (req, res) => {
  res.json({ success: "true" });
});


module.exports = movieRouter;