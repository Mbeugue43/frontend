import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Home from './components/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import AdminDashboard from './admin/AdminDashboard';
import DoctorDashboard from './doctor/DoctorDashboard';
import PatientDashboard from './patient/PatientDashboard';
import MyDossiers from './components/MyDossiers'; 
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
      <DoctorDashboard />
    </PrivateRoute>
  }
/>

          {/* Dashboard Patient (protégé) */}
          <Route
            path="/patient"
            element={
              <PrivateRoute allowedRoles={['Patient']}>
                <PatientDashboard />
              </PrivateRoute>
            }
          />
 
          {/* Mes Dossiers (protégé pour les patients) */}
          <Route
            path="/mes-dossiers"
            element={
              <PrivateRoute allowedRoles={['Patient']}>
                <MyDossiers />
              </PrivateRoute>
            }
          />
          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;