import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Home.css';
import { 
  FiShield, 
  FiLock, 
  FiDatabase, 
  FiUsers, 
  FiCalendar, 
  FiFileText, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiActivity,
  FiHeart,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowUp
} from 'react-icons/fi';

const Home = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Détecter la section active depuis l'URL ou le hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setActiveSection('home');
    }
  }, [location]);

  // Gérer le scroll pour afficher le bouton "retour en haut"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            <FiCheckCircle className="mr-2" />
            Plateforme Sanitaire Numérique
          </div>
          <h1 className="hero-title">
            Bienvenue chez <span className="gradient-text">GovAimed Sanitaire</span>
          </h1>
          <p className="hero-subtitle">
            Votre partenaire de confiance pour la gestion sanitaire moderne, sécurisée et adaptée au contexte sénégalais
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">
              <FiUsers className="mr-2" />
              Créer un compte
            </Link>
            <Link to="/login" className="btn-secondary">
              Se connecter
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <FiUsers size={24} />
              <div>
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Patients</span>
              </div>
            </div>
            <div className="stat-item">
              <FiActivity size={24} />
              <div>
                <span className="stat-number">500+</span>
                <span className="stat-label">Médecins</span>
              </div>
            </div>
            <div className="stat-item">
              <FiCalendar size={24} />
              <div>
                <span className="stat-number">50,000+</span>
                <span className="stat-label">Rendez-vous</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
      </section>

      {/* Fonctionnalités Section */}
      <section className="features" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nos Fonctionnalités</h2>
            <p className="section-subtitle">
              Découvrez les outils puissants qui facilitent la gestion sanitaire et administrative
            </p>
          </div>
          <div className="cards">
            <div className="card card-hover">
              <div className="card-icon">
                <FiUsers size={40} />
              </div>
              <h3>Gestion des Patients</h3>
              <p>Suivez et gérez efficacement les dossiers médicaux de vos patients avec une interface intuitive et sécurisée.</p>
              <ul className="card-features">
                <li><FiCheckCircle /> Dossiers médicaux complets</li>
                <li><FiCheckCircle /> Historique médical</li>
                <li><FiCheckCircle /> Suivi longitudinal</li>
              </ul>
            </div>
            <div className="card card-hover">
              <div className="card-icon">
                <FiCalendar size={40} />
              </div>
              <h3>Rendez-vous en Ligne</h3>
              <p>Planifiez et gérez les rendez-vous médicaux en temps réel avec notifications automatiques et suivi du rang.</p>
              <ul className="card-features">
                <li><FiCheckCircle /> Prise de rendez-vous en ligne</li>
                <li><FiCheckCircle /> Suivi du rang en temps réel</li>
                <li><FiCheckCircle /> Notifications SMS/App</li>
              </ul>
            </div>
            <div className="card card-hover">
              <div className="card-icon">
                <FiFileText size={40} />
              </div>
              <h3>Dossiers Médicaux</h3>
              <p>Accédez aux dossiers médicaux complets avec historique, consultations, prescriptions et examens.</p>
              <ul className="card-features">
                <li><FiCheckCircle /> Versioning des dossiers</li>
                <li><FiCheckCircle /> Journal des accès</li>
                <li><FiCheckCircle /> Signatures médicales</li>
              </ul>
            </div>
            <div className="card card-hover">
              <div className="card-icon">
                <FiActivity size={40} />
              </div>
              <h3>Consultations</h3>
              <p>Enregistrez et consultez l'historique complet des consultations médicales avec toutes les informations.</p>
              <ul className="card-features">
                <li><FiCheckCircle /> Historique complet</li>
                <li><FiCheckCircle /> Prescriptions intégrées</li>
                <li><FiCheckCircle /> Analyses et examens</li>
              </ul>
            </div>
            <div className="card card-hover">
              <div className="card-icon">
                <FiFileText size={40} />
              </div>
              <h3>Ordonnances</h3>
              <p>Créez et gérez les ordonnances médicales de manière sécurisée, traçable et accessible aux pharmaciens.</p>
              <ul className="card-features">
                <li><FiCheckCircle /> Ordonnances numériques</li>
                <li><FiCheckCircle /> Accès pharmacien</li>
                <li><FiCheckCircle /> Traçabilité complète</li>
              </ul>
            </div>
            <div className="card card-hover">
              <div className="card-icon">
                <FiTrendingUp size={40} />
              </div>
              <h3>Multi-Rôles & Espaces</h3>
              <p>Espaces dédiés pour chaque acteur : Administrateurs, Médecins, Patients, Pharmaciens, Assistants et plus.</p>
              <ul className="card-features">
                <li><FiCheckCircle /> 10 rôles différents</li>
                <li><FiCheckCircle /> Permissions granulaires</li>
                <li><FiCheckCircle /> Tableaux de bord personnalisés</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sécurité Section */}
      <section className="security" id="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sécurité & Confidentialité</h2>
            <p className="section-subtitle">
              Vos données médicales sont protégées avec les plus hauts standards de sécurité et de conformité
            </p>
          </div>
          <div className="security-grid">
            <div className="security-item">
              <div className="security-icon">
                <FiLock size={48} />
              </div>
              <h3>Chiffrement des Données</h3>
              <p>Toutes les données sensibles sont chiffrées en transit (TLS/SSL) et au repos (AES-256) selon les standards HIPAA et RGPD.</p>
            </div>
            <div className="security-item">
              <div className="security-icon">
                <FiShield size={48} />
              </div>
              <h3>Authentification Sécurisée</h3>
              <p>Système d'authentification robuste avec tokens JWT, contrôle d'accès basé sur les rôles (RBAC) et double authentification.</p>
            </div>
            <div className="security-item">
              <div className="security-icon">
                <FiDatabase size={48} />
              </div>
              <h3>Sauvegarde Automatique</h3>
              <p>Sauvegardes régulières et automatiques avec réplication pour garantir la disponibilité et l'intégrité des données.</p>
            </div>
            <div className="security-item">
              <div className="security-icon">
                <FiUsers size={48} />
              </div>
              <h3>Conformité RGPD</h3>
              <p>Respect strict des réglementations sur la protection des données personnelles et médicales avec audit régulier.</p>
            </div>
          </div>
          <div className="compliance">
            <h3>Conformité aux Standards Internationaux</h3>
            <div className="compliance-badges">
              <span className="badge">
                <FiCheckCircle className="mr-1" />
                RGPD
              </span>
              <span className="badge">
                <FiCheckCircle className="mr-1" />
                HIPAA
              </span>
              <span className="badge">
                <FiCheckCircle className="mr-1" />
                ISO 27001
              </span>
              <span className="badge">
                <FiCheckCircle className="mr-1" />
                HDS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contactez-nous</h2>
            <p className="section-subtitle">Une question ? Notre équipe est là pour vous aider</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail size={24} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>contact@govaimed-sanitaire.com</p>
                  <p>support@govaimed-sanitaire.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FiPhone size={24} />
                </div>
                <div>
                  <h4>Téléphone</h4>
                  <p>+221 33 XXX XX XX</p>
                  <p>Lun-Ven: 8h-18h</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMapPin size={24} />
                </div>
                <div>
                  <h4>Adresse</h4>
                  <p>Dakar, Sénégal</p>
                  <p>Plateforme Numérique Sanitaire</p>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom complet *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                  placeholder="Votre nom"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                  placeholder="votre.email@exemple.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Sujet *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  required
                  placeholder="Sujet de votre message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  rows="5"
                  placeholder="Votre message..."
                />
              </div>
              <button type="submit" className="btn-submit">
                <FiSend className="mr-2" size={18} />
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bouton retour en haut */}
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          <FiArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Home;
