import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Home from './components/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminDashboard from './admin/AdminDashboard';
import MedecinDashboard from './pages/MedecinDashboard';
import CreateDossier from './pages/CreateDossier';
import MesDossiers from './pages/MesDossiers';
import PatientDashboard from './pages/Composants/PatientDashboard';
import MyDossiers from './pages/Composants/MyDossiers';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Admin (protégé) */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['Admin', 'SuperAdmin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Dashboard Médecin (protégé) */}
          <Route
            path="/medecin"
            element={
              <PrivateRoute allowedRoles={['Medecin']}>
                <MedecinDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/medecin/create-dossier"
            element={
              <PrivateRoute allowedRoles={['Medecin']}>
                <CreateDossier />
              </PrivateRoute>
            }
          />
          <Route
            path="/medecin/mes-dossiers"
            element={
              <PrivateRoute allowedRoles={['Medecin']}>
                <MesDossiers />
              </PrivateRoute>
            }
          />

          {/* Pages Patient (protégé) */}
         <Route
  path="/patient/dashboard"
  element={
    <PrivateRoute allowedRoles={['Patient']}>
      <PatientDashboard />
    </PrivateRoute>
  }
>
  <Route index element={""} />
  <Route path="mes-dossiers" element={<MyDossiers />} />
</Route>

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;