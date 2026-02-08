import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api/endpoint';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Patient"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await postData('/auth/register', formData);
      alert("Inscription réussie ! Veuillez vous connecter.");
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert(error.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Style identique conservé
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Inscription</h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="text"
              name="fullName"
              placeholder="Nom complet"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="email"
              name="email"
              placeholder="email@exemple.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <select 
              name="role" 
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            >
              <option value="Patient">Patient</option>
              <option value="Medecin">Médecin</option>
              <option value="Pharmacien">Pharmacien</option>
              <option value="Assistant">Assistant / Guichet</option>
              <option value="AideSoignant">Aide-soignant</option>
              <option value="Stagiaire">Stagiaire</option>
              <option value="MediateurNumerique">Médiateur numérique</option>
              <option value="Moderateur">Modérateur</option>
              <option value="Admin">Administration</option>
              <option value="SuperAdmin">Super Administrateur</option>
            </select>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#ccc' : '#0b3c5d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '15px'
            }}
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center' }}>
          <a href="/login" style={{ color: '#0b3c5d', textDecoration: 'none' }}>
            Déjà inscrit ? Connexion
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
