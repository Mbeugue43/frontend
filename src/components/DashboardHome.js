import React from 'react';
import { FiUsers, FiActivity, FiCalendar, FiDollarSign, FiFileText } from 'react-icons/fi';

const DashboardHome = ({ stats = {}, user = {}, recentActivity = [] }) => {
  return (
    <div className="space-y-8 p-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Patients */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Patients</p>
              <p className="text-2xl font-bold">{stats.totalPatients ?? 0}</p>
            </div>
          </div>
        </div>

        {/* Activité / Consultations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
              <FiActivity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Consultations</p>
              <p className="text-2xl font-bold">{stats.consultations ?? stats.totalRdv ?? 0}</p>
            </div>
          </div>
        </div>

        {/* Rendez-vous */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FiCalendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">RDV</p>
              <p className="text-2xl font-bold">{stats.rendezVous ?? 0}</p>
            </div>
          </div>
        </div>

        {/* Revenus */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <FiDollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenus</p>
              <p className="text-2xl font-bold">{stats.revenue ? `${stats.revenue} FCFA` : '0 FCFA'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accueil utilisateur */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-semibold mb-4">Bienvenue {user.fullName ?? 'Utilisateur'}</h3>
        <p className="text-gray-600">Votre tableau de bord est opérationnel.</p>
      </div>

      {/* Activité récente */}
      {recentActivity.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-4">Activité récente</h3>
          <ul className="space-y-2">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-3">
                <FiFileText className="text-gray-400" />
                <span className="text-gray-700">{item.description || 'Événement récent'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;