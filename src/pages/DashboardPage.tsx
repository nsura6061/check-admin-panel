
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon, Users } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const revenueData = [
    { month: 'Jan', revenue: 4000, target: 3000 },
    { month: 'Feb', revenue: 3000, target: 3000 },
    { month: 'Mar', revenue: 2000, target: 3000 },
    { month: 'Apr', revenue: 2780, target: 3000 },
    { month: 'May', revenue: 1890, target: 3000 },
    { month: 'Jun', revenue: 2390, target: 3000 },
    { month: 'Jul', revenue: 3490, target: 3000 },
    { month: 'Aug', revenue: 3200, target: 3000 },
    { month: 'Sep', revenue: 2800, target: 3000 },
    { month: 'Oct', revenue: 3300, target: 3000 },
    { month: 'Nov', revenue: 3500, target: 3000 },
    { month: 'Dec', revenue: 3700, target: 3000 },
  ];

  const visitorData = [
    { name: 'Mobile', value: 400 },
    { name: 'Desktop', value: 300 },
    { name: 'Tablet', value: 150 },
  ];

  const trafficSourceData = [
    { name: 'Organic', value: 500 },
    { name: 'Direct', value: 350 },
    { name: 'Referral', value: 300 },
    { name: 'Social', value: 200 },
  ];

  const performanceData = [
    { name: 'Mon', value: 20 },
    { name: 'Tue', value: 40 },
    { name: 'Wed', value: 30 },
    { name: 'Thu', value: 70 },
    { name: 'Fri', value: 90 },
    { name: 'Sat', value: 60 },
    { name: 'Sun', value: 50 },
  ];

  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];

  const statsCards = [
    { 
      title: 'Active Users',
      value: '1,234',
      change: '+5.2%',
      description: 'from last month',
      icon: <Users size={24} className="text-primary" />
    },
    {
      title: 'Revenue',
      value: '$34,567',
      change: '+2.4%',
      description: 'from last month',
      icon: <BarChartIcon size={24} className="text-primary" />
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      description: 'from last month',
      icon: <PieChartIcon size={24} className="text-primary" />
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+0.3%',
      description: 'from last month',
      icon: <LineChartIcon size={24} className="text-primary" />
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">
        Welcome back, {user?.name}
        <span className="text-lg font-normal text-muted-foreground ml-2 capitalize">({user?.role})</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue vs. Target comparison for the last year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#9b87f5" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Weekly performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitors by Device</CardTitle>
            <CardDescription>Distribution of visitors across different devices</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visitorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {visitorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Distribution of traffic across different sources</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
