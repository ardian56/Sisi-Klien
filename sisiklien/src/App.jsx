import React from "react";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './App.css';
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import MahasiswaDetail from "./Pages/Admin/MahasiswaDetail";
import Dosen from "./Pages/Admin/Dosen";
import DosenDetail from "./Pages/Admin/DosenDetail";
import Kelas from "./Pages/Admin/Kelas";
import KelasDetail from "./Pages/Admin/KelasDetail";
import MataKuliah from "./Pages/Admin/MataKuliah";
import MataKuliahDetail from "./Pages/Admin/MataKuliahDetail";
import PageNotFound from "./Pages/PagesNotFound";
import AuthLayout from "./Pages/Layouts/AuthLayout";
import AdminLayout from "./Pages/Layouts/AdminLayout";
import ProtectedRoute from "./Pages/Layouts/ProtectedRoute";
import { AuthProvider } from "./Utils/Contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 menit
      gcTime: 10 * 60 * 1000, // 10 menit (dulu cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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
        path: "mahasiswa/:id",
        element: <MahasiswaDetail />,
      },
      {
        path: "dosen",
        element: <Dosen />,
      },
      {
        path: "dosen/:id",
        element: <DosenDetail />,
      },
      {
        path: "kelas",
        element: <Kelas />,
      },
      {
        path: "kelas/:id",
        element: <KelasDetail />,
      },
      {
        path: "matakuliah",
        element: <MataKuliah />,
      },
      {
        path: "matakuliah/:id",
        element: <MataKuliahDetail />,
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
