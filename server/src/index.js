const { connect } = require("./config/db");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const billRoutes = require("./routes/billRoutes");
const { verifyAuth } = require("./middleware/authMiddleware");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

/* Routes and Middleware */
app.use([express.json(), express.urlencoded({ extended: true }), cors()]);
app.use("/api/auth", authRoutes);
app.use("/api/bills", verifyAuth, billRoutes);

app.get("/access", verifyAuth, (req, res) => {
  console.log(req.user);
  res.json({ message: `Welcome ${req.user.payload.username}` });
});

/* MongoDB and ExpressJs Connection. */
app.listen(PORT, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
  connect(); // Connect to MongoDB
});
