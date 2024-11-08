const { TeamCollection, SubTeamCollection } = require("../models/teamModel");
const { usersCollection } = require("../models/userModel");
const { CustomError, ValidMongoId } = require("../utils/handleError");

async function addTeam(data) {
  // Check if the given fields are not empty
  for (const key of ["name", "budget"]) {
    if (!data[key])
      throw new CustomError(`Please enter your team's ${key}`, 400);
  }

  // Add the new team to the collection
  const newTeam = new TeamCollection(data);
  console.log(newTeam); // Debugging
  return await newTeam.save();
}

async function addMember(team_id, user_id) {
  // Check if the user exists

  if (!ValidMongoId(team_id)) throw new CustomError("Invalid team ID", 404);
  if (!ValidMongoId(user_id)) throw new CustomError("Invalid user ID", 404);

  const user = await usersCollection.findById(user_id);
  if (!user) throw new CustomError("User does not exist!", 404);

  // Find the team
  const team = await TeamCollection.findById(team_id);
  if (!team) throw new CustomError("Team not found!", 404);

  // Check if the user is already a member
  const isMember = team.members.some(
    (m) => m.user_id.toString() === user_id.toString()
  );
  if (isMember) {
    throw new CustomError("User is already a member of the team!", 400);
  }

  // Define the new member object
  const member = { user_id, role: "member" };

  // Add the member to the team
  team.members.push(member);
  return await team.save(); // Save the updated team
}

async function getMembers(team_id, collection) {
  if (!["team", "subteam"].includes(collection))
    throw new CustomError("Enter a valid purpose (team/subteam)");
  if (!ValidMongoId(team_id) || !team_id)
    throw new CustomError("Please enter a valid ID", 400);

  if (collection == "team") collection = TeamCollection;
  if (collection == "subteam") collection = SubTeamCollection;

  const team = await collection
    .findById(team_id)
    .populate("members.user_id", "name");

  return team.members;
}

module.exports = { addTeam, addMember, getMembers };
