const { billsCollection } = require("../models/billModel");
const { CustomError } = require("../utils/handleError");

async function addBill(data) {
  // Get the request data
  const { name, amount, due } = data || {};
  // Error checks
  if (!name || !amount || !due)
    throw new CustomError("Please fill in all the fields!");
  if (isNaN(due.getTime())) throw new CustomError("Please enter a valid date!");
  if (isNaN(amount)) throw new CustomError("Please enter a valid amount!");
  for (const key of ["name", "amount", "due"]) {
    if (!data[key]) throw new CustomError(`Please enter the ${key}!`);
  }

  // Save the data and returning for future use-case.
  bill_data = new billsCollection(data);
  return await bill_data.save();
}

async function getBills(req) {
  // Get the documents
  const user_id = req.user.payload._id;
  const data = await billsCollection.find({ user_id: user_id });
  return data;
}

async function deleteBill(_id) {
  if (!_id) throw new CustomError("Enter a valid id!");
  await billsCollection.findOneAndDelete({ _id });
  return { msg: "Success!" };
}

module.exports = { addBill, getBills, deleteBill };
