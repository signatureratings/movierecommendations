require('dotenv').config()
const express = require("express");
const app = express();




//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//routes




//listen
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});