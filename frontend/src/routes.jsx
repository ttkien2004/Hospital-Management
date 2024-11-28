import { redirect, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import ErrorBoundary from "./layout/ErrorBoundary";
import React, { Suspense } from "react";

// function lazy(moduleLoader) {
//   return async () => {
//     const component = await moduleLoader();
//     return { Component: component.default };
//   };
// }
const EmpPage = React.lazy(() => import("./pages/Employee/EmpPage"));
const NotiPage = React.lazy(() => import("./pages/Notification/NotiPage"));
const PatientPage = React.lazy(() => import("./pages/Patient/PatientPage"));
const MedicPage = React.lazy(() => import("./pages/Medical/MedicPage"));
const EquipPage = React.lazy(() => import("./pages/Equipment/EquipPage"));
const DiseasePage = React.lazy(() => import("./pages/Disease/DiseasePage"));

const routes = [
  {
    path: "",
    // element: <Navigate to={"/nhan-vien"} />,
    element: <Navigate to={"/nhan-vien"}></Navigate>,
  },
  {
    path: "nhan-vien",
    // lazy: lazy(() => import("./pages/Employee/EmpPage")),
    // lazy: React.lazy(() => import("./pages/Employee/EmpPage")),
    element: (
      <Suspense fallback={<div>Loading Employee Page...</div>}>
        <EmpPage />
      </Suspense>
    ),
  },
  {
    path: "noti",
    element: (
      <Suspense fallback={<div>Loading notification page</div>}>
        <NotiPage />
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
    path: "medic",
    element: (
      <Suspense fallback={<div>Loading Medic Page</div>}>
        <MedicPage />
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
  {
    path: "disease",
    element: (
      <Suspense fallback={<div>Loading disease page</div>}>
        <DiseasePage />
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
