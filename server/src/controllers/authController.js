const authService = require("../services/authService");
const { CustomError } = require("../utils/handleError");

async function login(req, res) {
  try {
    /* Collect username and password. */
    const { username, password } = req.body.data || {};
    token = await authService.loginUser(username, password);
    return res.status(200).json(token);
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function register(req, res) {
  try {
    const user = await authService.registerUser(req.body.data);
    return res
      .status(200)
      .json({ msg: "You have succesfully registered!", user });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { login, register };
