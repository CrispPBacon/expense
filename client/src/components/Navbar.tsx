import { IonIcon } from "@ionic/react";
import {
  card,
  checkmarkDoneCircle,
  home,
  logOut,
  options,
} from "ionicons/icons";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="profile">
        <img src="http://localhost:3000/avatars/1.png" alt="profile" />
        <h1>Allan Soriano</h1>
      </div>
      <ul>
        <li>
          <span>
            <IonIcon icon={home} />
          </span>
          <h1>Dashboard</h1>
        </li>
        <li>
          <span>
            <IonIcon icon={card} />
          </span>
          <h1>Expenses</h1>
        </li>
        <li>
          <span>
            <IonIcon icon={checkmarkDoneCircle} />
          </span>
          <h1>Approval</h1>
        </li>
        <li>
          <span>
            <IonIcon icon={options} />
          </span>
          <h1>Settings</h1>
        </li>
        <li
          onClick={() => {
            cookies.remove("TOKEN");
            location.reload();
          }}
        >
          <span style={{ color: "#ff5555" }}>
            <IonIcon icon={logOut} />
          </span>
          <h1 style={{ color: "#ff5555" }}>Logout</h1>
        </li>
      </ul>
      <div className="logo">
        <h1>ExpenseWise</h1>
      </div>
    </nav>
  );
}
