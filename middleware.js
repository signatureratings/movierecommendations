function checkUser(req, res, next) {
  if (req.body.user) {
    next();
  } else {
    res.status(401).json({
        message: "You must be logged in to do that."
    })
  }
}




module.exports = checkUser;