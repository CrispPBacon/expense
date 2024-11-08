import { useState } from "react";
import api from "../../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default function FormExpense() {
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [subject, setSubject] = useState(String);
  const [merchant, setMerchant] = useState(String);
  const [amount, setAmount] = useState(String);
  const [employee, setEmployee] = useState(String);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const status = "pending";
    const data = { subject, merchant, expenseDate, amount, employee, status };
    api
      .post(
        "/api/bills",
        { data: data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("TOKEN")}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.response.data.error));
  };

  const handleSaveDraft = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    alert("SAVE DRAFT");
  };

  return (
    <main>
      <header>
        <h1>New Expense</h1>
      </header>
      <form action="#" className="form-container">
        <div className="form-item">
          <label htmlFor="subjectForm">Subject*</label>
          <input
            type="text"
            id="subjectForm"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="merchantForm">Merchant*</label>
          <input
            type="text"
            id="merchantForm"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="dateForm">Date*</label>
          <input
            style={{ color: "white" }}
            type="date"
            id="dateForm"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="totalForm">Total*</label>
          <input
            type="text"
            id="totalForm"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="employeeForm">Employee*</label>
          <input
            type="text"
            id="employeeForm"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
        </div>
        <div>
          <button className="btn" onClick={handleSaveDraft}>
            Save draft
          </button>
          <button className="btn btn-second" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
