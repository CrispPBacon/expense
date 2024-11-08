const team = require("../services/teamService");
const { CustomError } = require("../utils/handleError");

async function newTeam(req, res) {
  try {
    const data = req.body?.data;
    req.body.data.members = [{ user_id: req.user.payload._id, role: "admin" }];
    const response = await team.addTeam(data);
    console.log("New Team has been added to the collection");
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ message: error.message });
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function newMember(req, res) {
  try {
    const { team_id, user_id } = req.body.data;
    const response = await team.addMember(team_id, user_id);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ message: error.message });
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function getMembers(req, res) {
  try {
    const { team_id, collection } = req.body.data || {};
    const response = await team.getMembers(team_id, collection);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ message: error.message });
  }
  console.log(error.message);
  return res.status(500).json({ message: error.message });
}
module.exports = { newTeam, newMember, getMembers };
