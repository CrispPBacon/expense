const authService = require("../services/authService");

async function login(req, res) {
  try {
    /* Collect username and password. */
    const { username, password } = req.body.data || {};
    token = await authService.loginUser(username, password);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function register(req, res) {
  try {
    const user = await authService.registerUser(req.body.data);
    return res
      .status(200)
      .json({ msg: "You have succesfully registered!", user });
  } catch (error) {
    return res.json({ error: error.message });
  }
}

module.exports = { login, register };
