import React, { useEffect, useState } from "react";
import { getData, deleteData, putData } from "../api/endpoint";
import "./DoctorDashboard.css";

const ITEMS_PER_PAGE = 10;

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalData, setModalData] = useState(null);

  // Charger les données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const patientsData = await getData("/patients");
        const dossiersData = await getData("/mes-dossiers");
        setPatients(patientsData);
        setDossiers(dossiersData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Supprimer patient
  const handleDeletePatient = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce patient ?")) return;
    try {
      await deleteData(`/user/${id}`);
      setPatients(patients.filter((p) => p._id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  // Supprimer dossier
  const handleDeleteDossier = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce dossier ?")) return;
    try {
      await deleteData(`/dossier/${id}`);
      setDossiers(dossiers.filter((d) => d._id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  // Ouvrir modal
  const openModal = (item, type) => {
    setModalData({ ...item, type });
  };

  // Fermer modal
  const closeModal = () => setModalData(null);

  // Sauvegarder les modifications
  const saveChanges = async () => {
    try {
      if (modalData.type === "patient") {
        await putData(`/user/${modalData._id}`, modalData);
        setPatients(
          patients.map((p) => (p._id === modalData._id ? modalData : p))
        );
      } else if (modalData.type === "dossier") {
        await putData(`/dossier/${modalData._id}`, modalData);
        setDossiers(
          dossiers.map((d) => (d._id === modalData._id ? modalData : d))
        );
      }
      closeModal();
    } catch (err) {
      alert("Erreur lors de la mise à jour : " + err.message);
    }
  };

  // Pagination
  const paginatedData = (data) => {
    const filtered = data.filter((item) =>
      item.username
        ? item.username.toLowerCase().includes(searchTerm.toLowerCase())
        : item.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="doctor-dashboard">
      <h2>Dashboard Médecin</h2>

      <input
        type="text"
        placeholder="Rechercher un patient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <section>
        <h3>Liste des Patients</h3>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData(patients).map((patient) => (
              <tr key={patient._id}>
                <td>{patient.username}</td>
                <td>{patient.email}</td>
                <td>{patient.phone || "N/A"}</td>
                <td>
                  <button onClick={() => openModal(patient, "patient")}>
                    Edit
                  </button>
                  <button onClick={() => handleDeletePatient(patient._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from(
            { length: Math.ceil(patients.length / ITEMS_PER_PAGE) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </section>

      <section>
        <h3>Liste des Dossiers</h3>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Résumé</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData(dossiers).map((dossier) => (
              <tr key={dossier._id}>
                <td>{dossier.patientName || "N/A"}</td>
                <td>{dossier.summary}</td>
                <td>{new Date(dossier.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => openModal(dossier, "dossier")}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteDossier(dossier._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <h3>Éditer {modalData.type}</h3>
            {modalData.type === "patient" ? (
              <>
                <input
                  type="text"
                  value={modalData.username}
                  onChange={(e) =>
                    setModalData({ ...modalData, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={modalData.email}
                  onChange={(e) =>
                    setModalData({ ...modalData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={modalData.phone || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, phone: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={modalData.patientName}
                  onChange={(e) =>
                    setModalData({ ...modalData, patientName: e.target.value })
                  }
                />
                <textarea
                  value={modalData.summary}
                  onChange={(e) =>
                    setModalData({ ...modalData, summary: e.target.value })
                  }
                />
              </>
            )}
            <div className="modal-buttons">
              <button onClick={saveChanges}>Sauvegarder</button>
              <button onClick={closeModal}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;