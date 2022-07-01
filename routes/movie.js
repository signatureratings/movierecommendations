const app = require("express");
const movieRouter = app.Router();
const {insertMovie, getMovieById, getMovieBytitle, updateMovie} = require("../models/movieModel");
const {getRating} = require("../models/ratingModel")

const { exec } = require("child_process");
function execute(filename) {
  exec(
    "cd scripts && python3 ?".replace("?", filename),
    (err, stdout, stderr) => {
      if (err) {
        console.log("error", err);
        return;
      }
      if (!stderr && stdout) {
        return stdout;
      }
      return new Error("error occured");
    }
  );
}
// movieRouter.post("/", async(req, res) => {
//   try{
//     if(req.body){
//       data = {
//       title : req.body.title,
//       movie_id : req.body.movie_id,
//       imdb_id :req.body.imdb_id,
//       generes : req.body.generes
//       }
//       let result = await insertMovie(data)
//       if(result){
//      return res.json({success:"true", result:result})
//       }
//       else{
//         return res.json({success:"false"})
//       }
//     }
//     else{
//       return res.json({message:"no data"})
//     }
//   }
//   catch(err){
//    return res.json({success: "false"})
//   }
// });

movieRouter.post("/", async(req,res)=>{
  try{
    if(req.body){
      movie_name = req.body.movie_name;
      //send data to script
      //output from script
      //search movie names in the output again and send 
      let result = await getMovieBytitle(movie_name)
      if(result){
        return res.json(result)
      }
      else{
        return res.json({message:"could not find the movie", status:400})
      }
    }
    else{
      return res.json({message:"no data is passed", status: 400})
    }
  }
  catch(err){
    return res.json({message:"error occured", status: 500})
  }
})

movieRouter.get("/:id", async (req, res) => {
  var movie_id = parseInt(req.params.id);
  console.log(req.headers.cookie);
  var cookie = req.headers.cookie;
 let userid = parseInt(cookie.split(";")[0].split("=")[1])
  var user_id = 1;
  try {
    let result = await getMovieById(movie_id);
    let rating = await getRating(user_id, movie_id);
    console.log(result);
    let arr = result.genres.replace(/'/g, '"');

    arr = JSON.parse(arr);
    console.log(arr);
    res.render("movie", {
      data: result,
      isLogin: true,
      genres: arr,
      rating: rating,
      userid:userid
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: "error occured", status: 500 });
  }
});

module.exports = movieRouter;
