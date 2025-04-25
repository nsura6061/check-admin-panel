import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth, PERMISSIONS } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Progress } from '@/components/ui/progress';

const MarketingPage: React.FC = () => {
  const { hasPermission } = useAuth();

  if (!hasPermission(PERMISSIONS.VIEW_MARKETING)) {
    return <Navigate to="/" />;
  }

  const campaignData = [
    { name: 'Email', metrics: { spend: 5000, leads: 320, conversions: 95, roi: 4.2 } },
    { name: 'Social', metrics: { spend: 8000, leads: 520, conversions: 125, roi: 3.8 } },
    { name: 'Search', metrics: { spend: 12000, leads: 680, conversions: 210, roi: 4.5 } },
    { name: 'Display', metrics: { spend: 6000, leads: 240, conversions: 45, roi: 1.8 } },
    { name: 'Content', metrics: { spend: 4000, leads: 190, conversions: 62, roi: 3.9 } },
  ];

  const channelBreakdownData = [
    { name: 'Email', value: 20 },
    { name: 'Social', value: 25 },
    { name: 'Search', value: 35 },
    { name: 'Display', value: 10 },
    { name: 'Content', value: 10 },
  ];

  const campaignPerformanceData = [
    { month: 'Jan', email: 45, social: 60, search: 82, display: 25, content: 35 },
    { month: 'Feb', email: 50, social: 55, search: 75, display: 30, content: 40 },
    { month: 'Mar', email: 60, social: 70, search: 85, display: 28, content: 42 },
    { month: 'Apr', email: 55, social: 80, search: 90, display: 35, content: 45 },
    { month: 'May', email: 65, social: 85, search: 95, display: 40, content: 50 },
    { month: 'Jun', email: 70, social: 75, search: 100, display: 45, content: 55 },
  ];

  const leadConversionData = [
    { source: 'Email', conversion: 65 },
    { source: 'Social', conversion: 45 },
    { source: 'Search', conversion: 72 },
    { source: 'Display', conversion: 35 },
    { source: 'Content', conversion: 58 },
  ];

  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#E5DEFF'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Marketing Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Marketing Spend</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{formatCurrency(35000)}</div>
            <p className="text-sm text-muted-foreground mt-1">+8% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Leads Generated</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">1,950</div>
            <p className="text-sm text-muted-foreground mt-1">+12% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">27.5%</div>
            <p className="text-sm text-muted-foreground mt-1">+1.8% from last year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Monthly performance across marketing channels</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={campaignPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="email" name="Email" stroke="#9b87f5" />
                <Line type="monotone" dataKey="social" name="Social" stroke="#7E69AB" />
                <Line type="monotone" dataKey="search" name="Search" stroke="#6E59A5" />
                <Line type="monotone" dataKey="display" name="Display" stroke="#D6BCFA" />
                <Line type="monotone" dataKey="content" name="Content" stroke="#E5DEFF" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Breakdown</CardTitle>
            <CardDescription>Distribution of marketing spend</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelBreakdownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {channelBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Spend Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Rates</CardTitle>
            <CardDescription>Percentage of leads that convert by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadConversionData.map((item, index) => (
                <div key={item.source} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.source}</span>
                    <span className="text-sm font-medium">{item.conversion}%</span>
                  </div>
                  <Progress 
                    value={item.conversion} 
                    className="h-2" 
                    indicatorClassName={`bg-[${COLORS[index % COLORS.length]}]`} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign ROI Analysis</CardTitle>
          <CardDescription>Return on investment across campaigns</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignData.map(c => ({ name: c.name, roi: c.metrics.roi }))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}x`} />
              <Tooltip formatter={(value) => [`${value}x`, 'ROI']} />
              <Legend />
              <Bar dataKey="roi" name="ROI" fill="#9b87f5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingPage;
