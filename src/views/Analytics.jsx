import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Users, CheckCircle } from 'lucide-react';

const Analytics = () => {
  const { jobs, candidates, applications } = useApp();

  // Données pour les graphiques
  const applicationsByStatus = [
    { name: 'Nouveau', value: applications.filter(a => a.status === 'new').length },
    { name: 'Présélection', value: applications.filter(a => a.status === 'screening').length },
    { name: 'Entretien', value: applications.filter(a => a.status === 'interview').length },
    { name: 'Offre', value: applications.filter(a => a.status === 'offer').length },
    { name: 'Embauché', value: applications.filter(a => a.status === 'hired').length },
  ];

  const COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#22c55e'];

  const monthlyData = [
    { month: 'Jan', candidatures: 12, embauches: 2 },
    { month: 'Fév', candidatures: 19, embauches: 3 },
    { month: 'Mar', candidatures: 15, embauches: 2 },
    { month: 'Avr', candidatures: 22, embauches: 4 },
    { month: 'Mai', candidatures: 18, embauches: 3 },
    { month: 'Juin', candidatures: 25, embauches: 5 },
  ];

  const topSkills = [
    { skill: 'JavaScript', count: 28 },
    { skill: 'Python', count: 25 },
    { skill: 'React', count: 22 },
    { skill: 'Node.js', count: 20 },
    { skill: 'TypeScript', count: 18 },
    { skill: 'AWS', count: 15 },
  ];

  const metrics = [
    {
      label: 'Temps moyen de recrutement',
      value: '28 jours',
      icon: Clock,
      color: 'bg-blue-500',
      trend: '-5 jours'
    },
    {
      label: 'Taux de conversion',
      value: '18%',
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: '+3%'
    },
    {
      label: 'Candidats actifs',
      value: candidates.length,
      icon: Users,
      color: 'bg-purple-500',
      trend: '+12'
    },
    {
      label: 'Taux de satisfaction',
      value: '94%',
      icon: CheckCircle,
      color: 'bg-yellow-500',
      trend: '+2%'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Rapports</h1>
        <p className="text-gray-600 mt-2">Analysez vos performances de recrutement</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">{metric.trend}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pipeline Status */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pipeline de recrutement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationsByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {applicationsByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Évolution mensuelle</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="candidatures" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="embauches" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Skills */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Compétences les plus demandées</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topSkills}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-2">🎯 Insight</h3>
          <p className="text-sm opacity-90">
            Vos offres pour développeurs JavaScript reçoivent 40% plus de candidatures que la moyenne
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-2">📈 Performance</h3>
          <p className="text-sm opacity-90">
            Le temps de recrutement a diminué de 18% ce trimestre grâce au matching IA
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-lg font-bold mb-2">💡 Recommandation</h3>
          <p className="text-sm opacity-90">
            Augmentez vos offres pour profils Data Science, forte demande détectée
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

