// src/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postData, setAuthToken, decodeToken } from "../api/endpoint";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Appel API login
      const data = await postData("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      // Stockage token
      setAuthToken(data.token);

      // Décoder token pour obtenir rôle
      const decoded = decodeToken(data.token);
      localStorage.setItem("user", JSON.stringify(decoded));

      // Redirection selon rôle
      const roleRoutes = {
        Patient: "/patient/dashboard",
        Medecin: "/medecin",
        Admin: "/admin",
        SuperAdmin: "/admin",
        Moderateur: "/moderateur",
        Pharmacien: "/pharmacien",
        Assistant: "/service",
        AideSoignant: "/service",
        Stagiaire: "/service",
        MediateurNumerique: "/service",
      };

      const route = roleRoutes[decoded.role] || "/";
      navigate(route, { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      // Gestion des erreurs API
      setError(
        err.response?.data?.message ||
        err.message ||
        "Erreur de connexion, vérifiez vos identifiants"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#0b3c5d",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Connexion
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: "#fee",
              color: "#c33",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #fcc",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                backgroundColor: loading ? "#f9f9f9" : "white",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                backgroundColor: loading ? "#f9f9f9" : "white",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: loading ? "#ccc" : "#0b3c5d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "14px",
            }}
          >
            <Link
              to="/register"
              style={{
                color: "#0b3c5d",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Pas de compte ? S'inscrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;