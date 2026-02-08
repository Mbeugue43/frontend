import React, { useEffect, useState } from "react";
import * as api from "../api/endpoint"; // Assure-toi que src/api/endpoint.js existe et exporte getData
const PatientDashboard = () => {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les dossiers du patient
  const fetchPatientDossiers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Route dédiée pour le patient
      const data = await api.getData("/mes-dossiers-patient"); 

      setDossiers(data);
    } catch (err) {
      console.error("Erreur chargement patient :", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientDossiers();
  }, []);

  if (loading) return <p>Chargement des dossiers...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Mes Dossiers Médicaux</h2>
      {dossiers.length === 0 ? (
        <p>Aucun dossier trouvé.</p>
      ) : (
        <ul>
          {dossiers.map((dossier) => (
            <li key={dossier._id}>
              <strong>Résumé :</strong> {dossier.resumeMedical} <br />
              <strong>Médecin :</strong> {dossier.medecinId?.fullName || "Non attribué"} <br />
              <strong>Date :</strong> {new Date(dossier.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDashboard;