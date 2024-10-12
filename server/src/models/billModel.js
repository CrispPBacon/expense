const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    amount: { type: Number, require: true },
    due: { type: Date, require: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
  },
  { versionKey: false }
);

const billsCollection = new mongoose.model("bills", billSchema);
module.exports = { billsCollection };
