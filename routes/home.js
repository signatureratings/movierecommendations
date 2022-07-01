const app = require("express");
const homeRouter = app.Router();
const {
  getTrendingMovies,
  getRecentlyWatchedMovies,
} = require("../models/movieModel");
const { login, createuser } = require("../models/userModel");

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

homeRouter.get("/", async (req, res) => {
  try {
    res.locals.name = "abc";
    //trending movies
    trendingmovies = await getTrendingMovies();
    userid = req.cookies;
    if(userid){
        //recently watched
   recentlywatchedmovies = await getRecentlyWatchedMovies(1);
    }
    //content preferences
    const url = "https://image.tmdb.org/t/p/original/";

    res.render("home", {
      isLogin: userid ? true : false,
      trending: trendingmovies,
      recentlywatched: recentlywatchedmovies,
      url: url,
      itemBased: [],
    });
  } catch (err) {
    //error page could not show the movies
    console.log(err);
    return res.json({ message: "could not show the page" });
  }
});

homeRouter.get("/signin", (req, res) => {
  res.render("signin");
});

homeRouter.post("/login", async (req, res) => {
  var flag = await login(req.body.email, req.body.password);
  if (flag) {
    res.cookie("userid", flag.user_id);
    res.cookie("isLogin", true);
    res.redirect("/");
  } else {
    res.redirect("/signin");
  }
});

// homeRouter.post("/recentlywatched", async(req,res)=>{
//     let userid = req.body.userid
//     try{
//     recentlywatched = await getRecentlyWatchedMovies(userid)
//     return res.json(recentlywatched)
//     }
//     catch(err){
//         return res.json({message: "error"})
//     }
// })

// homeRouter.post("/createuser", async(req, res)=>{
//     let data = req.body
//     try{
//         let result = await createuser(data)
//         console.log(result)
//         res.json({message: "success"})
//     }
//     catch(err){
//         console.log(err)
//         res.json({message: "failed"})
//     }
// })
module.exports = homeRouter;
