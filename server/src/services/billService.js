const { billsCollection } = require("../models/billModel");
const { CustomError, ValidMongoId } = require("../utils/handleError");

async function addBill(bill) {
  // Get the request data
  console.log(bill);

  const { /*subject, merchant,*/ amount, expenseDate } = bill.data || {};
  // Check if the fields are complete
  for (const key of ["subject", "merchant", "amount", "expenseDate"]) {
    if (!bill.data[key]) throw new CustomError(`Please enter the ${key}!`, 400);
  }
  if (isNaN(expenseDate.getTime()))
    throw new CustomError("Please enter a valid date!", 400);
  if (isNaN(amount)) throw new CustomError("Please enter a valid amount!", 400);

  const expense = {
    user_id: bill.user_id,
    type: bill?.team_id ? "team" : "personal",
    details: bill.data,
  };

  if (bill?.team_id) {
    expense.team_id = bill.team_id;
  }

  console.log(expense);

  // Save the data and returning for future use-case.
  bill_data = new billsCollection(expense);
  return await bill_data.save();
}

async function getBills(req) {
  // Get the documents
  const id = req.params.id;

  // Check if the id is valid
  if (!ValidMongoId(id)) throw new CustomError("Invalid ID Provided", 400);

  const user_id = req.user.payload._id;
  const data = await billsCollection.find(
    id ? { team_id: id, type: "team" } : { user_id: user_id, type: "personal" }
  );

  if (!data) throw new CustomError("The ID Provided does not exists", 404);

  return data;
}

async function deleteBill(_id) {
  if (!_id) throw new CustomError("Enter a valid id!", 400);
  await billsCollection.findOneAndDelete({ _id });
  return { msg: "Success!" };
}

module.exports = { addBill, getBills, deleteBill };
