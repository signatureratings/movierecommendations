const app = require("express");
const movieRouter = app.Router();
const {getMovie} = require("../controllers/movie")
const {checkUser} = require("../middleware")

movieRouter.get("/movie/:id", checkUser, async (req, res) => {
data = getMovie(req,res)
res.json(data)
});
