import { useEffect, useState } from "react";
import api from "../utils/api";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const cookies = new Cookies();
export default function Team() {
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Regex to allow only numbers
    if (/^\d*$/.test(inputValue) && inputValue.length < 16) {
      setBudget(inputValue);
    }
  };

  const handleSubmit = () => {
    const data = { name, description, budget };
    api
      .post(
        "/api/team",
        { data },
        { headers: { Authorization: `Bearer ${cookies.get("TOKEN")}` } }
      )
      .then((res) => console.log(res.data))
      .catch((error) =>
        console.log(error.response?.data?.message || error.message)
      );
  };

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter your team's name"
          autoComplete="off"
          autoSave="off"
          autoCorrect="off"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description (Optional)"
          autoComplete="off"
          autoSave="off"
          autoCorrect="off"
        />
        <input
          type="text"
          onChange={handleBudgetChange}
          value={budget}
          placeholder="Enter initial budget"
          autoComplete="off"
          autoSave="off"
          autoCorrect="off"
        />
        <button onClick={handleSubmit}>SUBMIT</button>
      </div>
      <br />
      <br />
      <MemberForm />
      <Expenses />
    </>
  );
}

export function MemberForm() {
  const [user_id, setUserId] = useState("");
  const [team_id, setTeamId] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { user_id, team_id };
    api
      .post(
        "/api/team/member",
        { data },
        { headers: { Authorization: `Bearer ${cookies.get("TOKEN")}` } }
      )
      .then((res) => console.log(res.data))
      .catch((error) =>
        console.log(error.response?.data?.message || error.message)
      );
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={team_id}
        onChange={(e) => setTeamId(e.target.value)}
        autoComplete="off"
        autoSave="off"
        autoCorrect="off"
        placeholder="Enter team id"
      />
      <input
        type="text"
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
        autoComplete="off"
        autoSave="off"
        autoCorrect="off"
        placeholder="Enter user id"
      />
      <button>Add Member</button>
    </form>
  );
}

export function Expenses() {
  const { id } = useParams();
  const [expenses, setExpenses] = useState<expenseType[]>([]);

  useEffect(() => {
    console.log(id);
    api
      .get(id ? `/api/bills/${id}` : "/api/bills", {
        headers: { Authorization: `Bearer ${cookies.get("TOKEN")}` },
      })
      .then((res) => setExpenses(res.data))
      .catch((error) =>
        console.log(error.response?.data?.message || error.message)
      );
  }, [id]);
  return (
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Merchant</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((item) => (
          <Expense
            key={item._id}
            subject={item.details.subject}
            merchant={item.details.merchant}
            amount={item.details.amount}
            expenseDate={item.details.expenseDate}
            status={item.details.status}
            type={item.type}
          />
        ))}
      </tbody>
    </table>
  );
}

interface expenseType {
  user_id: string;
  _id: string;
  type: string;
  details: ExpenseType;
}

interface ExpenseType {
  subject: string;
  merchant: string;
  amount: string;
  expenseDate: string;
  status: string;
  type: string;
}
export function Expense({
  subject,
  merchant,
  amount,
  expenseDate,
  status,
  type,
}: ExpenseType) {
  return (
    <tr>
      <td>{subject}</td>
      <td>{merchant}</td>
      <td>{amount}</td>
      <td>{expenseDate}</td>
      <td>{status}</td>
      <td>{type}</td>
    </tr>
  );
}
