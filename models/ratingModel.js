const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating_id: { type: "string", required: true, unique: true },
  movie_id: { type: "string", required: true, unique: true },
  movie_title: {type: "string", required: true},
  comment: { type: "string" },
  rating: { type: "number", required: true },
});

module.exports = mongoose.model("ratingSchema", ratingSchema);
