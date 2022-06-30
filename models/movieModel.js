const mongoose = require("mongoose");
const {getLastRatings} = require("./ratingModel")
const {db} = require("../models/connection")

const MovieSchema = new mongoose.Schema({
  index: { type: "number" },
  adult: { type: "Boolean" },
  belongs_to_collection: { type: "String" },
  budget: { type: "number" },
  genres_x: { type: "String" },
  homepage: { type: "String" },
  tmdbId: { type: "number" },
  imdb_id: { type: "string" },
  original_language: { type: "string" },
  original_title: { type: "string" },
  overview: { type: "string" },
  popularity: { type: "number" },
  poster_path: { type: "string" },
  production_companies: { type: "string" },
  production_countries: { type: "string" },
  release_date: { type: "string" },
  revenue: { type: "number" },
  runtime: { type: "number" },
  spoken_languages: { type: "string" },
  status: { type: "string" },
  tagline: { type: "string" },
  title_x: { type: "string" },
  video: { type: "string" },
  vote_average: { type: "number" },
  vote_count: { type: "number" },
  movieId: { type: "number" },
  imdbId: { type: "number" },
  title: { type: "string" },
  genres: { type: "string" },
});

const TrendingMovieSchema = new mongoose.Schema({
  movie_id: { type: "string", required: true, unique: true },
  imdb_id: { type: "string", unique: true },
  trending_number: { type: "number", unique: true },
  title: { type: "string", required: true, unique: true },
  generes: { type: "array", required: true },
  avg_rating: { type: "number" },
  poster_path: { type: "string" },
  homepage: { type: "string" }
});

const MovieModel = mongoose.model("movieschema", MovieSchema);
const TrendingModel = mongoose.model("trendingmovieschema", TrendingMovieSchema);

async function insertMovie(movieData) {
  try {
    let movie = MovieModel(movieData);
    result = await movie.save();
    return result;
  } catch (err) {
    console.log(err);
    return Error({ message: "failed to insert movie" });
  }
}

async function getMovieById(movie_id) {
  try {
    result = await MovieModel.findOne({ movieId: movie_id });
    return result;
  } catch (err) {
    console.log(err);
    return Error({ message: "failed to get movie" });
  }
}

async function getMovieBytitle(title) {
  try {
    let result = await MovieModel.findOne({ title_x: title });
    //result = await MovieModel.aggregate([{$match:{ $movietitle: {$search:"vik"}}}])
    return result;
  } catch (err) {
    console.log(err);
    return Error({ message: "failed to get movie" });
  }
}

async function getTrendingMovies() {
  try {
    let result = await TrendingModel.find();
    return result;
  } catch (err) {
    return new Error({ message: "cannot get Trending Movies" });
  }
}

async function getRecentlyWatchedMovies(userid){
  try{
    let result = await getLastRatings(userid)
    movie_ids = []
    result.forEach((value)=>{
      movie_ids.push(value.movie_id)
    })
    let finalresult = await MovieModel.find({movie_id: { $in: movie_ids}})
    return finalresult
  }
  catch(err){
    return Error({message: "cannot get the recently watched Movies"})
  }
}

async function updateMovie(id, updatedData) {
  try {
    let result = await MovieModel.findOneAndUpdate(
      { movie_id: id },
      updatedData
    );
    return result;
  } catch (err) {
    return Error({ message: "failed to update the movie" });
  }
}

module.exports = { insertMovie, getMovieById, getMovieBytitle, getTrendingMovies, getRecentlyWatchedMovies };
