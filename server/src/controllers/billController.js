const { toDate } = require("date-fns");
const bill = require("../services/billService");
const { CustomError } = require("../utils/handleError");

/* Custom Error to catch semantic errors */

/*
{
"data": {
  "subject": "Novel Books",
  "merchant": "TheBookstore",
  "expenseDate": "2024-10-26",
  "amount": "100000",
  "employee": "Allan Soriano",
  "status": "completed"
  }, 
  "team_id": "6727a5a7225299f5fbef374b"
}
*/
async function newBill(req, res) {
  try {
    if (req.body?.data?.expenseDate)
      req.body.data.expenseDate = toDate(req.body.data.expenseDate);
    req.body.user_id = req.user.payload._id;
    const data = await bill.addBill(req.body);
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function getBills(req, res) {
  try {
    data = await bill.getBills(req);
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}

async function delBill(req, res, next) {
  try {
    const _id = req.params.id;
    await bill.deleteBill(_id);
    next();
  } catch (error) {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { newBill, getBills, delBill };
