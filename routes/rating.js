const app = require("express");
const ratingRouter = app.Router();
const {setRating} = require("../models/ratingModel")


ratingRouter.post("/", async(req, res)=>{
    try{
        if(req.body){
            let result = await setRating(req.body.userid, req.body.movieid, req.body.rating)
            if(result){
                return res.json({message:"successfull", status:200})
            }
            else{
                res.json({message:"failed", status: 400})
            }
        }
    }
    catch(err){
        return res.json({message:" error occured while updating the rating", status: 500})
    }
})




module.exports = ratingRouter