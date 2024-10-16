const express = require("express");
const { newBill, getBills, delBill } = require("../controllers/billController");

const router = express.Router();

router.get("/", getBills);
router.post("/", newBill);
router.delete("/:id", delBill, getBills);

module.exports = router;
