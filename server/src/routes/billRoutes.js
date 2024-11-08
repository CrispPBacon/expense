const express = require("express");
const {
  newBill,
  getBills,
  delBill,
  getMembers,
} = require("../controllers/billController");

const router = express.Router();

router.get("/", getBills);
router.get("/:id", getBills);
router.post("/", newBill);
router.delete("/:id", delBill, getBills);

module.exports = router;
