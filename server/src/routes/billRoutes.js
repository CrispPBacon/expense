const express = require("express");
const { newBill, getBills } = require("../controllers/billController");

const router = express.Router();

router.get("/", getBills);
router.post("/", newBill);

module.exports = router;
