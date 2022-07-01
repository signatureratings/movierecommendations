require("dotenv").config();
const express = require("express");
const app = express();
const {connectDB} = require("./models/connection");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

//database Connection
//https://image.tmdb.org/t/p/original
connectDB();


//routes
app.use("/api/movie", require("./routes/movie"));
app.use("/api/rating", require("./routes/rating"))
app.use("/", require("./routes/home"))


//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
