import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import ProtectedRoute from "./api/ProtectedRoute";

const cookies = new Cookies();
const Login = React.lazy(() => import("./components/auth/Login"));
const Expenses = React.lazy(() => import("./components/expenses/Expenses"));
const Navbar = React.lazy(() => import("./components/Navbar"));
const FormExpense = React.lazy(
  () => import("./components/expenses/FormExpense")
);

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route
          path={"/login"}
          element={!cookies.get("TOKEN") ? <Login /> : <Navigate to={"/"} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route
              path="/"
              element={
                <main>
                  <header>
                    <h1>Dashboard</h1>
                  </header>
                </main>
              }
            />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/addexpense" element={<FormExpense />} />
          </Route>
          <Route path="*" element={<h1>Not found</h1>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function ProtectedLayout() {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
