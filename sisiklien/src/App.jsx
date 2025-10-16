import React from "react";
import { Toaster } from "react-hot-toast";
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
import ProtectedRoute from "./Pages/Layouts/ProtectedRoute";

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
    element: (
    <ProtectedRoute>
      <AdminLayout />
      </ProtectedRoute>
    ),
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
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  </React.StrictMode>
);
