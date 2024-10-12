import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import ProtectedRoute from "./api/ProtectedRoute";

const cookies = new Cookies();
const Login = React.lazy(() => import("./components/auth/Login"));
const Index = React.lazy(() => import("./components/dashboard/Dashboard"));
function App() {
  return (
    <>
      <Routes>
        <Route
          path={"/login"}
          element={
            !cookies.get("TOKEN") ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Index />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
