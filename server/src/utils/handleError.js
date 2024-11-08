const mongoose = require("mongoose");

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 400;
  }
}

function ValidMongoId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  return true;
}

module.exports = { CustomError, ValidMongoId };
