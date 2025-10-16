import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Briefcase, Clock, Target, Zap,
  Award, Filter, Calendar, ArrowUp, ArrowDown, Activity, Star, Eye
} from 'lucide-react';

const AnalyticsModern = () => {
  const { jobs, candidates, applications } = useApp();
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  const [selectedMetric, setSelectedMetric] = useState('all');

  // === DONNÉES CALCULÉES ===
  const totalApplications = applications.length;
  const hiredCount = applications.filter(a => a.status === 'hired').length;
  const conversionRate = totalApplications > 0 ? ((hiredCount / totalApplications) * 100).toFixed(1) : 0;
  const avgRecruitmentTime = 28; // jours
  const profileViews = 1247;

  // Données pour les graphiques
  const monthlyTrend = [
    { month: 'Jan', candidatures: 45, embauches: 8, vues: 230 },
    { month: 'Fév', candidatures: 52, embauches: 10, vues: 280 },
    { month: 'Mar', candidatures: 48, embauches: 7, vues: 260 },
    { month: 'Avr', candidatures: 61, embauches: 12, vues: 320 },
    { month: 'Mai', candidatures: 55, embauches: 9, vues: 295 },
    { month: 'Juin', candidatures: 70, embauches: 14, vues: 380 },
  ];

  const conversionFunnel = [
    { name: 'Candidatures', value: 100, count: 250 },
    { name: 'Présélection', value: 65, count: 163 },
    { name: 'Entretiens', value: 32, count: 80 },
    { name: 'Offres', value: 18, count: 45 },
    { name: 'Embauches', value: 14, count: 35 },
  ];

  const skillsDemand = [
    { skill: 'JavaScript', demand: 95, growth: 12 },
    { skill: 'Python', demand: 90, growth: 18 },
    { skill: 'React', demand: 85, growth: 22 },
    { skill: 'AWS', demand: 80, growth: 15 },
    { skill: 'Docker', demand: 75, growth: 20 },
    { skill: 'Node.js', demand: 72, growth: 14 },
  ];

  const performanceMetrics = [
    { subject: 'Qualité', A: 92, fullMark: 100 },
    { subject: 'Rapidité', A: 85, fullMark: 100 },
    { subject: 'Matching', A: 95, fullMark: 100 },
    { subject: 'Satisfaction', A: 88, fullMark: 100 },
    { subject: 'Efficacité', A: 90, fullMark: 100 },
  ];

  const pipelineDistribution = [
    { name: 'Nouveau', value: 45, color: '#3b82f6' },
    { name: 'Présélection', value: 32, color: '#f59e0b' },
    { name: 'Entretien', value: 28, color: '#8b5cf6' },
    { name: 'Offre', value: 18, color: '#10b981' },
    { name: 'Embauché', value: 15, color: '#22c55e' },
  ];

  // === METRICS CARDS ===
  const metrics = [
    {
      label: 'Candidatures totales',
      value: totalApplications,
      change: '+18%',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      label: 'Taux de conversion',
      value: `${conversionRate}%`,
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      label: 'Temps moyen',
      value: `${avgRecruitmentTime}j`,
      change: '-5 jours',
      trend: 'up',
      icon: Clock,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      label: 'Vues de profils',
      value: profileViews,
      change: '+24%',
      trend: 'up',
      icon: Eye,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Analytics & Insights
            </h1>
            <p className="text-gray-600">Tableau de bord des performances en temps réel</p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex gap-2 bg-white p-1.5 rounded-2xl shadow-lg border border-gray-100">
            {['Semaine', 'Mois', 'Trimestre', 'Année'].map((range, idx) => (
              <button
                key={range}
                onClick={() => setTimeRange(['week', 'month', 'quarter', 'year'][idx])}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  timeRange === ['week', 'month', 'quarter', 'year'][idx]
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden bg-gradient-to-br ${metric.bgGradient} rounded-3xl p-6 border border-white shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:scale-105`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.gradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span className="text-sm font-bold">{metric.change}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tendance mensuelle */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Tendance mensuelle</h2>
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="colorCandidatures" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEmbauches" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Area type="monotone" dataKey="candidatures" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCandidatures)" strokeWidth={3} />
              <Area type="monotone" dataKey="embauches" stroke="#10b981" fillOpacity={1} fill="url(#colorEmbauches)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline Distribution */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Distribution Pipeline</h2>
            <Briefcase className="w-6 h-6 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pipelineDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pipelineDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Compétences en demande */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Compétences les plus demandées</h2>
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsDemand} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="skill" type="category" stroke="#6b7280" width={80} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="demand" fill="url(#barGradient)" radius={[0, 10, 10, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Performance Globale</h2>
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceMetrics}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
              <PolarRadiusAxis stroke="#6b7280" />
              <Radar name="Score" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel de Conversion */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 mb-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Funnel de Conversion</h2>
          <TrendingUp className="w-7 h-7 text-green-600" />
        </div>
        <div className="space-y-4">
          {conversionFunnel.map((stage, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{stage.name}</span>
                <span className="text-sm font-medium text-gray-600">{stage.count} candidats</span>
              </div>
              <div className="relative h-12 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-4"
                  style={{ width: `${stage.value}%` }}
                >
                  <span className="text-white font-bold text-sm">{stage.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <Zap className="w-12 h-12 mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-3">🎯 Insight Clé</h3>
          <p className="text-blue-50 leading-relaxed">
            Vos offres pour profils JavaScript reçoivent <span className="font-bold">40% plus</span> de candidatures que la moyenne du marché
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <TrendingUp className="w-12 h-12 mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-3">📈 Performance</h3>
          <p className="text-green-50 leading-relaxed">
            Le temps de recrutement a <span className="font-bold">diminué de 18%</span> ce trimestre grâce au matching IA avancé
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <Target className="w-12 h-12 mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-3">💡 Recommandation</h3>
          <p className="text-purple-50 leading-relaxed">
            Augmentez vos offres pour profils <span className="font-bold">Data Science</span> - forte demande détectée (+35%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModern;

