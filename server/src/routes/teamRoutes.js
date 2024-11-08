const express = require("express");
const {
  newTeam,
  newMember,
  getMembers,
} = require("../controllers/teamController");

const router = express.Router();

// router.get("/", getTeam);
router.post("/", newTeam);
router.post("/members", newMember);
router.get("/members", getMembers);

module.exports = router;
