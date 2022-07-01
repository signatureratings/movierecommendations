const mongoose = require("mongoose");
const {db} = require("./connection")

const ratingSchema = new mongoose.Schema({
  rating_id: { type: "number", unique: true },
  movieId: { type: "number", required: true },
  userId: { type: "number", required: true },
  rating: { type: "number", required: true },
  timestamp: {type: "Date", default: Date.now}
});

const ratingModel = mongoose.model("ratingschema", ratingSchema);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRating(userid, movieid) {
  try {
    let result = await ratingModel.findOne({movie_id: movieid, user_id:userid})
    return result
  } catch (err) {
    return Error({ message: "failed to get the rating" });
  }
}

async function getLastRatings(userid){
  try{
    let result = await ratingModel.find({userId: userid}, 'movieId').limit(5)
    console.log(result)
    return result
  }
  catch(err){
    return err
  }
}

async function setRating(userid, movieid, Rating) {
try{
let data = {
  rating_id: getRandomInt(510000, 600000), 
  userId: userid,
  movieId: movieid,
  rating: Rating
};
let rating = ratingModel(data)
let result = await rating.save()
return result
}
catch(err){
  console.log("error occurred")
  return err
}
}

module.exports = {getRating, setRating, getLastRatings}
