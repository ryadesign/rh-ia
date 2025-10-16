import React, { useContext } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Users, Briefcase, Target, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Bar, BarChart, Line, LineChart, Area, AreaChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '../components/ui/chart';

const AnalyticsShadcn = () => {
  const { candidates, jobs, applications } = useApp();

  // Data pour le graphique de candidatures par mois
  const applicationsData = [
    { month: "Jan", candidatures: 45, embauches: 8 },
    { month: "Fév", candidatures: 52, embauches: 12 },
    { month: "Mar", candidatures: 61, embauches: 15 },
    { month: "Avr", candidatures: 58, embauches: 11 },
    { month: "Mai", candidatures: 67, embauches: 18 },
    { month: "Juin", candidatures: 73, embauches: 22 },
  ];

  const applicationsConfig = {
    candidatures: {
      label: "Candidatures",
      color: "#000000",
    },
    embauches: {
      label: "Embauches",
      color: "#525252",
    },
  };

  // Data pour le taux de conversion
  const conversionData = [
    { stage: "Candidatures", value: 100, fill: "#000000" },
    { stage: "Présélection", value: 65, fill: "#404040" },
    { stage: "Entretiens", value: 35, fill: "#525252" },
    { stage: "Offres", value: 20, fill: "#737373" },
    { stage: "Embauches", value: 15, fill: "#a3a3a3" },
  ];

  const conversionConfig = {
    value: {
      label: "Taux",
      color: "#000000",
    },
  };

  // Data pour les sources de candidats
  const sourcesData = [
    { source: "LinkedIn", candidates: 125, fill: "#000000" },
    { source: "Site Web", candidates: 89, fill: "#404040" },
    { source: "Cooptation", candidates: 67, fill: "#525252" },
    { source: "JobBoards", candidates: 54, fill: "#737373" },
    { source: "Autres", candidates: 32, fill: "#a3a3a3" },
  ];

  const sourcesConfig = {
    candidates: {
      label: "Candidats",
    },
    LinkedIn: {
      label: "LinkedIn",
      color: "#000000",
    },
    "Site Web": {
      label: "Site Web",
      color: "#404040",
    },
    Cooptation: {
      label: "Cooptation",
      color: "#525252",
    },
    JobBoards: {
      label: "Job Boards",
      color: "#737373",
    },
    Autres: {
      label: "Autres",
      color: "#a3a3a3",
    },
  };

  // Data pour la qualité des matches
  const matchQualityData = [
    { range: "90-100%", count: 23 },
    { range: "80-89%", count: 45 },
    { range: "70-79%", count: 67 },
    { range: "60-69%", count: 38 },
    { range: "< 60%", count: 15 },
  ];

  const matchQualityConfig = {
    count: {
      label: "Nombre de candidats",
      color: "#000000",
    },
  };

  // KPIs
  const stats = [
    {
      title: "Candidats Actifs",
      value: candidates.length,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Offres Ouvertes",
      value: jobs.filter(j => j.status === 'open').length,
      change: "+5%",
      trend: "up",
      icon: Briefcase,
      color: "purple",
    },
    {
      title: "Taux de Conversion",
      value: "28%",
      change: "+3%",
      trend: "up",
      icon: Target,
      color: "green",
    },
    {
      title: "Temps Moyen",
      value: "18j",
      change: "-2j",
      trend: "down",
      icon: Clock,
      color: "orange",
    },
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: "from-gray-800 to-gray-600",
      purple: "from-gray-700 to-gray-500",
      green: "from-gray-600 to-gray-400",
      orange: "from-gray-500 to-gray-300",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="apple-title text-3xl sm:text-4xl lg:text-5xl text-black mb-2">
          Analytics
        </h1>
        <p className="apple-body text-sm sm:text-base text-gray-500">
          Vue d'ensemble de vos performances de recrutement
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group bg-white rounded-3xl p-6 apple-shadow-sm hover:apple-shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getStatColor(
                    stat.color
                  )} flex items-center justify-center apple-shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    stat.trend === "up"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-black mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-medium">{stat.title}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Candidatures & Embauches */}
        <Card className="border-gray-100 apple-shadow-sm hover:apple-shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#1d1d1f]">
              Candidatures & Embauches
            </CardTitle>
            <CardDescription className="text-gray-500">
              Évolution sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={applicationsConfig} className="h-[300px] w-full">
              <BarChart data={applicationsData} accessibilityLayer>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  style={{ fontSize: '12px', fill: '#6b7280' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="candidatures" fill="var(--color-candidatures)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="embauches" fill="var(--color-embauches)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Taux de Conversion */}
        <Card className="border-gray-100 apple-shadow-sm hover:apple-shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#1d1d1f]">
              Funnel de Conversion
            </CardTitle>
            <CardDescription className="text-gray-500">
              Du premier contact à l'embauche
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={conversionConfig} className="h-[300px] w-full">
              <BarChart data={conversionData} layout="vertical" accessibilityLayer>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="stage"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  style={{ fontSize: '12px', fill: '#6b7280' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sources de Candidats */}
        <Card className="border-gray-100 apple-shadow-sm hover:apple-shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#1d1d1f]">
              Sources de Candidats
            </CardTitle>
            <CardDescription className="text-gray-500">
              Répartition par canal d'acquisition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={sourcesConfig} className="h-[300px] w-full">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="source" />} />
                <Pie
                  data={sourcesData}
                  dataKey="candidates"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="source" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Qualité des Matches */}
        <Card className="border-gray-100 apple-shadow-sm hover:apple-shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#1d1d1f]">
              Qualité des Matches IA
            </CardTitle>
            <CardDescription className="text-gray-500">
              Distribution des scores de matching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={matchQualityConfig} className="h-[300px] w-full">
              <AreaChart data={matchQualityData} accessibilityLayer>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="range"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  style={{ fontSize: '12px', fill: '#6b7280' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#000000"
                  strokeWidth={2}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-100 apple-shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Candidatures Acceptées
            </CardTitle>
            <CheckCircle className="w-5 h-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-700">156</div>
            <p className="text-xs text-gray-600 mt-1">+12% ce mois-ci</p>
          </CardContent>
        </Card>

        <Card className="border-gray-100 apple-shadow-sm bg-gradient-to-br from-gray-100 to-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              En Attente
            </CardTitle>
            <AlertCircle className="w-5 h-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-700">23</div>
            <p className="text-xs text-gray-600 mt-1">À traiter rapidement</p>
          </CardContent>
        </Card>

        <Card className="border-gray-100 apple-shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Refusées
            </CardTitle>
            <XCircle className="w-5 h-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-700">89</div>
            <p className="text-xs text-gray-600 mt-1">-8% ce mois-ci</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsShadcn;

