require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./models/connection");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//database Connection
connectDB();

//routes
app.use("/api/movie", require("./routes/movie"));




//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
