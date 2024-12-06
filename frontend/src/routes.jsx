import { redirect, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import ErrorBoundary from "./layout/ErrorBoundary";
import React, { Suspense } from "react";

const PatientPage = React.lazy(() => import("./pages/Patient/PatientPage"));
const EquipPage = React.lazy(() => import("./pages/Equipment/EquipPage"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const HistoryPage = React.lazy(() => import("./pages/Patient/HistoryPage"));

const routes = [
  {
    path: "",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<div>Loading Login Page...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<div>Loading Register Page...</div>}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "patient",
    element: (
      <Suspense fallback={<div>Loading Patient page</div>}>
        <PatientPage />
      </Suspense>
    ),
  },
  {
    path: "patient/history-treatment/:id",
    element: (
      <Suspense fallback={<div>Loading History treatment page</div>}>
        <HistoryPage />
      </Suspense>
    ),
  },
  {
    path: "equipment",
    element: (
      <Suspense fallback={<div>Loading Equipment page</div>}>
        <EquipPage />
      </Suspense>
    ),
  },
];

const routesWithLayout = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: routes,
    errorElement: <ErrorBoundary />,
  },
];

export default routesWithLayout;
