const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: { type: "string", required: true, unique: true },
  username: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  email: { type: "string", required: true, unique: true }
});

const UserModel = mongoose.model("userschema", UserSchema)
async function getUserDetails(user_id){
try{
  result = await UserModel.findOne({user_id: user_id});
  return result
}
catch(err){
  console.log(err)
  return Error({message: "failed to get user details"});
}
}

async function login(email, password){
  try{
    result = await UserModel.findOne({email: email, password: password});
    return result;
  }
  catch(err){
    console.log(err)
    return Error({message: "failed to login"});
  }
}

async function createuser(userData){
  try{
    let user = new UserModel(userData);
    result = await user.save();
    return result;
  }
  catch(err){
    console.log(err)
    return Error({message: "failed to create user"});
  }
}

module.exports = {getUserDetails, login, createuser};
