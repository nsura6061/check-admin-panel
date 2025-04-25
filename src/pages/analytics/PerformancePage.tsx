
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth, PERMISSIONS } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PerformancePage: React.FC = () => {
  const { hasPermission } = useAuth();

  if (!hasPermission(PERMISSIONS.VIEW_PERFORMANCE)) {
    return <Navigate to="/" />;
  }

  const performanceData = [
    { date: '2023-04-01', pageLoadTime: 1.2, serverResponseTime: 0.5, totalLoadTime: 1.7 },
    { date: '2023-04-02', pageLoadTime: 1.3, serverResponseTime: 0.4, totalLoadTime: 1.7 },
    { date: '2023-04-03', pageLoadTime: 1.1, serverResponseTime: 0.6, totalLoadTime: 1.7 },
    { date: '2023-04-04', pageLoadTime: 1.4, serverResponseTime: 0.5, totalLoadTime: 1.9 },
    { date: '2023-04-05', pageLoadTime: 1.3, serverResponseTime: 0.7, totalLoadTime: 2.0 },
    { date: '2023-04-06', pageLoadTime: 1.2, serverResponseTime: 0.6, totalLoadTime: 1.8 },
    { date: '2023-04-07', pageLoadTime: 1.1, serverResponseTime: 0.5, totalLoadTime: 1.6 },
    { date: '2023-04-08', pageLoadTime: 1.0, serverResponseTime: 0.4, totalLoadTime: 1.4 },
    { date: '2023-04-09', pageLoadTime: 1.1, serverResponseTime: 0.5, totalLoadTime: 1.6 },
    { date: '2023-04-10', pageLoadTime: 1.2, serverResponseTime: 0.5, totalLoadTime: 1.7 },
    { date: '2023-04-11', pageLoadTime: 1.3, serverResponseTime: 0.6, totalLoadTime: 1.9 },
    { date: '2023-04-12', pageLoadTime: 1.2, serverResponseTime: 0.5, totalLoadTime: 1.7 },
    { date: '2023-04-13', pageLoadTime: 1.1, serverResponseTime: 0.4, totalLoadTime: 1.5 },
    { date: '2023-04-14', pageLoadTime: 1.2, serverResponseTime: 0.5, totalLoadTime: 1.7 },
  ];

  const errorRateData = [
    { date: '2023-04-01', errorRate: 0.5, clientErrors: 0.3, serverErrors: 0.2 },
    { date: '2023-04-02', errorRate: 0.7, clientErrors: 0.5, serverErrors: 0.2 },
    { date: '2023-04-03', errorRate: 0.4, clientErrors: 0.3, serverErrors: 0.1 },
    { date: '2023-04-04', errorRate: 0.3, clientErrors: 0.2, serverErrors: 0.1 },
    { date: '2023-04-05', errorRate: 0.6, clientErrors: 0.4, serverErrors: 0.2 },
    { date: '2023-04-06', errorRate: 0.9, clientErrors: 0.6, serverErrors: 0.3 },
    { date: '2023-04-07', errorRate: 0.8, clientErrors: 0.5, serverErrors: 0.3 },
    { date: '2023-04-08', errorRate: 0.5, clientErrors: 0.3, serverErrors: 0.2 },
    { date: '2023-04-09', errorRate: 0.3, clientErrors: 0.2, serverErrors: 0.1 },
    { date: '2023-04-10', errorRate: 0.4, clientErrors: 0.3, serverErrors: 0.1 },
    { date: '2023-04-11', errorRate: 0.5, clientErrors: 0.3, serverErrors: 0.2 },
    { date: '2023-04-12', errorRate: 0.3, clientErrors: 0.2, serverErrors: 0.1 },
    { date: '2023-04-13', errorRate: 0.2, clientErrors: 0.1, serverErrors: 0.1 },
    { date: '2023-04-14', errorRate: 0.4, clientErrors: 0.2, serverErrors: 0.2 },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Performance Analytics</h2>

      <Tabs defaultValue="loadTimes" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="loadTimes">Load Times</TabsTrigger>
          <TabsTrigger value="errorRates">Error Rates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="loadTimes" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Page Load Time</CardTitle>
                <CardDescription>Average: 1.2s</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">1.2s</div>
                <p className="text-sm text-muted-foreground mt-1">3% faster than last week</p>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Server Response Time</CardTitle>
                <CardDescription>Average: 0.5s</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">0.5s</div>
                <p className="text-sm text-muted-foreground mt-1">1% slower than last week</p>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Total Load Time</CardTitle>
                <CardDescription>Average: 1.7s</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">1.7s</div>
                <p className="text-sm text-muted-foreground mt-1">2% faster than last week</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Load Time Trends</CardTitle>
              <CardDescription>Last 14 days performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${value}s`}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}s`, '']}
                    labelFormatter={formatDate}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="pageLoadTime" 
                    name="Page Load Time" 
                    stroke="#9b87f5" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="serverResponseTime" 
                    name="Server Response Time" 
                    stroke="#7E69AB" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalLoadTime" 
                    name="Total Load Time" 
                    stroke="#6E59A5" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="errorRates" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Error Rate</CardTitle>
                <CardDescription>Average: 0.5%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">0.5%</div>
                <p className="text-sm text-muted-foreground mt-1">0.1% lower than last week</p>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Client Errors</CardTitle>
                <CardDescription>Average: 0.3%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">0.3%</div>
                <p className="text-sm text-muted-foreground mt-1">0.1% lower than last week</p>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Server Errors</CardTitle>
                <CardDescription>Average: 0.2%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">0.2%</div>
                <p className="text-sm text-muted-foreground mt-1">No change from last week</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Error Rate Trends</CardTitle>
              <CardDescription>Last 14 days error metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={errorRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    labelFormatter={formatDate}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="errorRate" 
                    name="Total Error Rate" 
                    stroke="#9b87f5" 
                    fill="#9b87f5" 
                    fillOpacity={0.2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clientErrors" 
                    name="Client Errors" 
                    stroke="#7E69AB" 
                    fill="#7E69AB" 
                    fillOpacity={0.2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="serverErrors" 
                    name="Server Errors" 
                    stroke="#6E59A5" 
                    fill="#6E59A5" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformancePage;
