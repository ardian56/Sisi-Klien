import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail";
import PageNotFound from "./Pages/PagesNotFound";
import AuthLayout from "./Pages/Layouts/AuthLayout";
import AdminLayout from "./Pages/Layouts/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "mahasiswa",
        element: <Mahasiswa />,
      },
      {
        path: "mahasiswa/:nim",
        element: <MahasiswaDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
