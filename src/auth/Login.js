import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postData, setAuthToken, decodeToken } from '../api/endpoint';

const Login = () => {
  const [infologin, setInfologin] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfologin({
      ...infologin,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // ✅ Utilise l'API unifiée avec /auth/login
      const data = await postData('/auth/login', {
        email: infologin.email,
        password: infologin.password
      });
      
      setAuthToken(data.token);
      
      const payload = decodeToken(data.token);
      alert("Connexion réussie !");

      // Redirection selon le rôle
      const roleRoutes = {
        'Admin': '/admin',
        'SuperAdmin': '/admin',
        'Patient': '/patient',
        'Medecin': '/medecin',
        'Moderateur': '/moderateur',
        'Pharmacien': '/pharmacien',
        'Assistant': '/service',
        'AideSoignant': '/service',
        'Stagiaire': '/service',
        'MediateurNumerique': '/service'
      };
      
      const route = roleRoutes[payload.role] || '/';
      navigate(route);
      
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Même style inline conservé
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="email" 
              name="email" 
              placeholder="Email"
              value={infologin.email}
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
              value={infologin.password}
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
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          <div style={{ textAlign: 'center' }}>
            <a href="/register" style={{ color: '#0b3c5d', textDecoration: 'none' }}>
              Pas de compte ? S'inscrire
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
