import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
import ProtectedRoute, { ProtectedLayout } from "./components/ProtectedRoute";

const Login = React.lazy(() => import("./components/auth/Login"));
const Team = React.lazy(() => import("./components/Team"));
const cookies = new Cookies();
export default function App() {
  return (
    <Suspense>
      <Routes>
        <Route
          path="/login"
          element={!cookies.get("TOKEN") ? <Login /> : <Navigate to={"/"} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path={"/"} element={<h1>Yo!</h1>} />
            <Route path={"/team"} element={<Team />} />
            <Route path={"/team/:id"} element={<Team />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
