import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import api from "../../api/api";

const cookies = new Cookies();

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post(
        "/api/auth/login",
        { data: { username, password } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        cookies.set("TOKEN", response.data, { path: "/" });
        setMessage({ error: false, msg: "You have logged in successfully" });
        navigate(location.state?.from?.pathname || "/", { replace: true });
      })
      .catch((error) =>
        setMessage(
          error?.message && !error?.response?.data?.error
            ? { error: true, msg: error.message }
            : { error: true, msg: error.response.data.error }
        )
      );
  };

  // Custom Error Message Styles
  const error = message?.error ? (
    <p
      style={{ color: "#ff5555", backgroundColor: "#101010", padding: ".5rem" }}
    >
      {message.msg}
    </p>
  ) : (
    message.msg && (
      <p
        style={{
          color: "#55ff55",
          backgroundColor: "#101010",
          padding: ".5rem",
        }}
      >
        {message.msg}
      </p>
    )
  );

  return (
    <div className="login-container">
      <div className="title">
        <h1>Login</h1>
        <p>Please login to continue</p>
        {error}
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-item">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            autoSave="off"
          />
        </div>
        <div className="form-item">
          <input
            type="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            autoSave="off"
          />
        </div>
        <button className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
