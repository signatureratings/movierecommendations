const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: { type: "string", required: true, unique: true },
  username: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  user_taste: { type: "string" }
});

function getUserDetails(user_id){
try{
  result = await UserSchema.findOne({user_id: user_id});
  return result
}
catch(err){
  console.log(err)
  return Error({message: "failed to get user details"});
}
}

function login(email, password){
  try{
    result = await UserSchema.findOne({email: email, password: password});
    return result;
  }
  catch(err){
    console.log(err)
    return Error({message: "failed to login"});
  }
}

function createuser(userData){
  try{
    let user = new UserSchema(userData);
    result = await user.save();
    return result;
  }
  catch(err){
    console.log(err)
    return Error({message: "failed to create user"});
  }
}

module.exports = {getUserDetails, login, createuser};
