const express = require("express");
const { login, register } = require("../controllers/authController");
const { verifyAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", verifyAuth, (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = router;
