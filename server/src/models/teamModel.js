const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  role: { type: String, required: true },
});

const SubTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  budget: { type: Number },
  members: [memberSchema],
});

TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    budget: { type: Number, required: true },
    members: [memberSchema],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "subteams" }],
  },
  { versionKey: false, timestamps: true }
);

const TeamCollection = new mongoose.model("teams", TeamSchema);
const SubTeamCollection = new mongoose.model("subteams", SubTeamSchema);
module.exports = { TeamCollection, SubTeamCollection };
