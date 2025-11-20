import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Admin/Dashboard';
import Kelas from './Pages/Admin/Kelas';
import AdminLayout from './Pages/Layouts/AdminLayout';
import ProtectedRoute from './Pages/Layouts/ProtectedRoute';
import { modulList } from './utils/dummyData';

function App() {
  const [modules, setModules] = useState(() => {
    const savedModules = localStorage.getItem('modules');
    return savedModules ? JSON.parse(savedModules) : modulList;
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    localStorage.setItem('modules', JSON.stringify(modules));
  }, [modules]);

  const handleModuleComplete = (index) => {
    setModules((prevModules) => {
      const newModules = [...prevModules];
      newModules[index] = { ...newModules[index], selesai: true };
      return newModules;
    });
  };

  const calculateProgress = () => {
    const completedCount = modules.filter((m) => m.selesai).length;
    return Math.round((completedCount / modules.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={<Dashboard progress={progress} userName={user?.nama} />}
            />
            <Route
              path="kelas"
              element={
                <Kelas
                  modules={modules}
                  onModuleComplete={handleModuleComplete}
                  progress={progress}
                />
              }
            />
          </Route>
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
