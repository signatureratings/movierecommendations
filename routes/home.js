const app = require("express");
const homeRouter = app.Router();
const {getTrendingMovies, getRecentlyWatchedMovies} = require("../models/movieModel")
const {exec} = require("child_process")
function execute(filename){
exec("cd scripts && python3 ?".replace("?", filename), (err, stdout, stderr)=>{
    if(err){
        console.log("error", err);
        return;
    }
    if(!stderr && stdout){
        return stdout
    }
    return new Error("error occured")
})
}

homeRouter.get("/", async(req,res)=>{
try{
//trending movies
trendingmovies = await getTrendingMovies()
if(req.cookies.login){
    //recently watched
    recentlywatchedmovies = await getRecentlyWatchedMovies();

    //item based
    try {
        let userid = req.cookies.login
        let itembasedmovies = execute("item_rec.py  ?".replace(userid))
    } catch (error) {
        console.log("error getting data for item based")
    }
    //get data from scripts
}
//content preferences



}
catch(err){
    //error page could not show the movies
    return res.json({message: "could not show the page"})
}
})

module.exports = homeRouter