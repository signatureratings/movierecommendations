const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  movie_id: { type: "string", required: true, unique: true },
  title: { type: "string", required: true, unique: true },
  generes: {type: "array", required: true},
  avg_rating: { type: "number", required: true },
});

function insertMovie(movieData){
try{
let movie = new MovieSchema(movieData);
result = await movie.save();
return result;
}
catch(err){
    console.log(err)
  return Error({message: "failed to insert movie"});
}
}

function getMovieById(movie_id) {
  try{
    result = await MovieSchema.findOne({movie_id: movie_id});
    return result;
  }
  catch(err){
    console.log(err)
    return Error({message: "failed to get movie"});
  }
}

function getMovieBytitle(title){
  try{
    result = await MovieSchema.findOne({title: title});
    return result;
  }
  catch(err){
    console.log(err)
    return Error({message: "failed to get movie"});
  }
}

function updateMovie(id, updatedData){
try{
result = await MovieSchema.findOneAndUpdate({movie_id: id}, updatedData);
}
catch(err){
  console.log(err)
  return Error({message: "failed to update the movie"});
}
}

module.exports = {getMovieById, getMovieBytitle, updateMovie};
