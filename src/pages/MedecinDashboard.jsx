import React from "react";
import { Link } from "react-router-dom";
import "../Styles/MedecinDashboard.css";

const MedecinDashboard = () => {
  return (
    <div className="MedecinDashboard">
      <p>Bienvenue sur votre espace médecin !</p>
      <h1>👨‍⚕️ Dashboard Médecin</h1>

      <nav>
        <Link to="/medecin/create-dossier">➕ Créer Dossier</Link>
        <Link to="/medecin/mes-dossiers">📂 Mes Dossiers</Link>
      </nav>
    </div>
  );
};

export default MedecinDashboard;