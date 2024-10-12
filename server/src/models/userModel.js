const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { versionKey: false }
);

const usersCollection = new mongoose.model("users", usersSchema);
module.exports = { usersCollection };
