import React, { useState, useEffect } from 'react';
import * as api from '../api/endpoint'; // Assure-toi que src/api/endpoint.js existe et exporte getData
const MyDossiers = () => {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDossiers = async () => {
      try {
        const data = await api.getData('/mes-dossiers');
        setDossiers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDossiers();
  }, []);

  // ====== Fonction pour créer un nouveau dossier ======
  const handleCreateDossier = async () => {
    try {
      const newDossier = await api.postData('/new-dossier', {
        patientId: '64f0e...', // à remplacer par l'ID réel du patient
        resumeMedical: 'Patient avec antécédents...',
      });
      console.log('Dossier créé:', newDossier);

      // Optionnel : mettre à jour la liste après création
      setDossiers(prev => [...prev, newDossier.dossier]);
    } catch (err) {
      console.error('Erreur création dossier:', err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <h2>Mes Dossiers</h2>

      <button onClick={handleCreateDossier}>Créer un nouveau dossier</button>

      {dossiers.length === 0 ? (
        <p>Aucun dossier trouvé.</p>
      ) : (
        dossiers.map(d => (
          <div key={d._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p>Patient: {d.patientId.fullName}</p>
            <p>Médecin: {d.medecinId.fullName}</p>
            <p>Résumé: {d.resumeMedical}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyDossiers;