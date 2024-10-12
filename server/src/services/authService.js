const jwt = require("jsonwebtoken");
require("dotenv").config();
const { usersCollection } = require("../models/userModel");
const { CustomError } = require("../utils/handleError");

async function loginUser(username, password) {
  if (!username) throw new CustomError("Please enter your username!");
  if (!password) throw new CustomError("Please enter your password!");

  const user_data = await usersCollection.findOne({ username });
  if (!user_data) throw new CustomError("User not found!");
  if (user_data.password != password)
    throw new CustomError("Password does not match!");

  /* Provide access token for authentication */
  const payload = {
    _id: user_data._id,
    name: user_data.name,
    username: user_data.username,
  };
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  console.log({ token });
  return token;
}

async function registerUser(data) {
  const { name, age, username, password } = data || {};
  for (const key of ["name", "age", "username", "password"]) {
    if (!data[key]) {
      throw new CustomError(`Please enter your ${key}!`);
    }
  }

  /* Prevent username duplication */
  const existingUser = await usersCollection.findOne({ username });
  if (existingUser) {
    throw new CustomError("Username is already taken!");
  }

  /* Save user information to database */
  user_data = new usersCollection({ name, age, username, password });
  return await user_data.save();
}

module.exports = { loginUser, registerUser };
