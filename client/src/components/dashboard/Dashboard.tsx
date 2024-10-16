import { FormEvent, useEffect, useState } from "react";
import "../../styles/pages/dashboard.css";
import { toDate } from "date-fns";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

type bills = {
  _id: string;
  name: string;
  amount: number;
  due: string;
};

const month = [
  "Jan",
  "Feb",
  "Mar",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Dashboard() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [due, setDue] = useState<Date | null>(null);

  const [data, setData] = useState<bills[] | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = cookies.get("TOKEN");
    axios
      .post(
        "http://localhost:3000/api/bills",
        { data: { name, amount, due } },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData((prev) => (prev ? [res.data, ...prev] : [res.data]));
      })
      .catch((error) => {
        console.log(error);
        if (!error?.response?.data?.error) {
          cookies.remove("TOKEN");
          navigate("/");
        }
      });
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bill_id: string
  ) => {
    const token = cookies.get("TOKEN");
    e.preventDefault();
    console.log(bill_id);
    axios
      .delete(`http://localhost:3000/api/bills/${bill_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data.length > 0 ? res.data : null))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    const token = cookies.get("TOKEN");
    axios
      .get("http://localhost:3000/api/bills", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.length !== 0) setData(res.data.reverse());
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <>
      <div className="bills">
        <h1>Add Bill</h1>
        <form onSubmit={handleSubmit} className="bills-form">
          <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            placeholder="Amount"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <input
            type="date"
            autoComplete="off"
            autoCorrect="off"
            autoSave="off"
            placeholder="Due"
            onChange={(e) => setDue(toDate(e.target.value))}
          />
          <button>Add</button>
        </form>
      </div>
      {!data ? null : (
        <div className="result">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Due</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((bill) => (
                <tr key={bill._id}>
                  <td>{bill.name}</td>
                  <td>{bill.amount}</td>
                  <td>{`${month[toDate(bill.due).getMonth() - 1]} ${toDate(
                    bill.due
                  ).getDay()} ${toDate(bill.due).getFullYear()}`}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        handleDelete(e, bill._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Dashboard;
