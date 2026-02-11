import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../Styles/PatientDashboard.css"; // CHEMIN CORRIGÉ

const PatientDashboard = () => {
  return (
    <div className="PatientDashboard">
      <h1>Tableau de bord patient</h1>

      <div className="PatientDashboard-links">
        <Link to="mes-dossiers" className="btn btn-primary">
          Mes dossiers
        </Link>

        <Link to="/logout" className="btn btn-danger">
          Déconnexion
        </Link>
      </div>

      <div className="PatientDashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default PatientDashboard;