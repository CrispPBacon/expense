const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true, enum: ["personal", "team"] },
    team_id: { type: mongoose.Schema.Types.ObjectId },
    details: {
      subject: { type: String, required: true },
      merchant: { type: String, required: true },
      amount: { type: Number, required: true },
      expenseDate: { type: Date, required: true, default: Date.now },
      status: {
        type: String,
        required: true,
        enum: ["pending", "draft"],
      },
      receipt_id: { type: String }, // IMAGE_ID FOR RECEIPT
    },
  },
  { versionKey: false, timestamps: true }
);

const billsCollection = new mongoose.model("bills", billSchema);
module.exports = { billsCollection };
