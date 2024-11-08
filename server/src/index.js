const { connect } = require("./config/db");
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const billRoutes = require("./routes/billRoutes");
const teamRoutes = require("./routes/teamRoutes");

const { verifyAuth } = require("./middleware/authMiddleware");
const { getMembers } = require("./services/teamService");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

/* Routes and Middleware */
app.use("/avatars", express.static(path.join(__dirname, "..", "avatars")));
app.use([express.json(), express.urlencoded({ extended: true }), cors()]);
app.use("/api/auth", authRoutes);
app.use("/api/bills", verifyAuth, billRoutes);
app.use("/api/team", verifyAuth, teamRoutes);

app.get("/", verifyAuth, (req, res) => {
  console.log(req.user);
  res.json({ message: `Welcome ${req.user.payload.username}` });
});

app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "uploads", "profile.jpg"), (err) => {
    if (err) {
      res.status(404).send({ message: "Image not found!" });
    }
  });
});

/* MongoDB and ExpressJs Connection. */
app.listen(PORT, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
  connect(); // Connect to MongoDB
});
