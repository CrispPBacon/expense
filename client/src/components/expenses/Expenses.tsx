import { IonIcon } from "@ionic/react";
import { bagHandle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Cookies from "universal-cookie";
import { formatCurrency } from "../../utils/utils";

const cookies = new Cookies();
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

export default function Expenses() {
  const [expenses, setExpenses] = useState<ExpensesType[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { team_id } = useParams();

  const newExpenseBtn = () => {
    navigate("/addexpense", { state: { from: location } });
  };

  useEffect(() => {
    api
      .get("/api/bills", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("TOKEN")}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setExpenses(res.data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  useEffect(() => console.log(team_id), [team_id]);

  return (
    <main>
      <header>
        <h1>Expenses</h1>
        <div className="header-actions">
          <button className="btn" onClick={newExpenseBtn}>
            + New expense
          </button>
        </div>
      </header>
      <table className="expense-table">
        <thead>
          <tr>
            <th className="except">
              <input type="checkbox" />
            </th>
            <th>Details</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Report</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0
            ? expenses.map((i) => (
                <Expense
                  key={i._id}
                  subject={i.details.subject}
                  merchant={i.details.merchant}
                  expenseDate={new Date(i.details.expenseDate)}
                  status={i.details.status}
                  amount={Number(i.details.amount)}
                />
              ))
            : null}
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <div>
                <IonIcon icon={bagHandle}></IonIcon>
                <span>
                  <p>09/11/2022</p>
                  <h1>Shopping</h1>
                </span>
              </div>
            </td>
            <td>McFood</td>
            <td>₱250.00</td>
            <td>November 2022</td>
            <td>
              <span>Submitted</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

interface ExpensesType {
  _id: string;
  user_id: string;
  type: string;
  details: ItemsType;
}

interface ItemsType {
  subject: string;
  merchant: string;
  amount: number;
  expenseDate: Date;
  status: string;
}

function Expense({
  subject,
  merchant,
  amount,
  expenseDate,
  status,
}: ItemsType) {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <div>
          <IonIcon icon={bagHandle}></IonIcon>
          <span>
            <p>09/11/2022</p>
            <h1>{subject}</h1>
          </span>
        </div>
      </td>

      <td>{merchant}</td>
      <td>{formatCurrency(amount, "PHP")}</td>
      <td>{`${month[expenseDate.getMonth() - 1]} ${expenseDate.getDate()}`}</td>
      <td>{status}</td>
    </tr>
  );
}
