const { toDate } = require("date-fns");
const bill = require("../services/billService");
const { CustomError } = require("../utils/handleError");

// Use try-catch block to catch the new error thrown
async function newBill(req, res) {
  try {
    req.body.data.user_id = req.user.payload._id;
    if (req.body?.data?.due) req.body.data.due = toDate(req.body.data.due);
    data = await bill.addBill(req.body.data);
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof CustomError)
      res.status(500).json({ error: error.message });
  }
}

async function getBills(req, res) {
  try {
    data = await bill.getBills(req);
    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof CustomError)
      res.status(500).json({ error: error.message });
  }
}

module.exports = { newBill, getBills };
