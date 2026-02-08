import React from 'react';
import { FiUsers, FiActivity, FiCalendar, FiDollarSign, FiFileText } from 'react-icons/fi';

const DashboardHome = ({ stats = {}, user = {}, recentActivity = [] }) => {
  return (
    <div className="space-y-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="text-2xl font-bold">{stats.totalPatients || stats.patients || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
              <FiActivity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Activité</p>
              <p className="text-2xl font-bold">{stats.consultations || stats.totalRdv || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FiCalendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">RDV</p>
              <p className="text-2xl font-bold">{stats.rendezVous || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <FiDollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenus</p>
              <p className="text-2xl font-bold">{stats.revenue || 0} FCFA</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-xl font-semibold mb-4">Bienvenue {user.nom || 'Utilisateur'}</h3>
        <p className="text-gray-600">Votre tableau de bord est opérationnel.</p>
      </div>
    </div>
  );
};

export default DashboardHome;
