
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
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RevenuePage: React.FC = () => {
  const { hasPermission } = useAuth();

  if (!hasPermission(PERMISSIONS.VIEW_REVENUE)) {
    return <Navigate to="/" />;
  }

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 34000, profit: 18000 },
    { month: 'Mar', revenue: 49000, expenses: 33000, profit: 16000 },
    { month: 'Apr', revenue: 58000, expenses: 36000, profit: 22000 },
    { month: 'May', revenue: 63000, expenses: 38000, profit: 25000 },
    { month: 'Jun', revenue: 72000, expenses: 42000, profit: 30000 },
    { month: 'Jul', revenue: 76000, expenses: 45000, profit: 31000 },
    { month: 'Aug', revenue: 80000, expenses: 47000, profit: 33000 },
    { month: 'Sep', revenue: 85000, expenses: 49000, profit: 36000 },
    { month: 'Oct', revenue: 92000, expenses: 52000, profit: 40000 },
    { month: 'Nov', revenue: 97000, expenses: 54000, profit: 43000 },
    { month: 'Dec', revenue: 105000, expenses: 58000, profit: 47000 },
  ];

  const productRevenueData = [
    { product: 'Product A', revenue: 28000, growth: '+12%' },
    { product: 'Product B', revenue: 22000, growth: '+8%' },
    { product: 'Product C', revenue: 18000, growth: '+15%' },
    { product: 'Product D', revenue: 14000, growth: '-3%' },
    { product: 'Product E', revenue: 12000, growth: '+5%' },
  ];

  const channelRevenueData = [
    { channel: 'Direct Sales', revenue: 42000 },
    { channel: 'Online Store', revenue: 38000 },
    { channel: 'Distributors', revenue: 25000 },
    { channel: 'Partners', revenue: 18000 },
    { channel: 'Other', revenue: 5000 },
  ];

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
      <h2 className="text-3xl font-bold">Revenue Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{formatCurrency(874000)}</div>
            <p className="text-sm text-muted-foreground mt-1">+14% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Profit Margin</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">42.3%</div>
            <p className="text-sm text-muted-foreground mt-1">+2.1% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Forecasted Annual Revenue</CardTitle>
            <CardDescription>Based on current trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{formatCurrency(980000)}</div>
            <p className="text-sm text-muted-foreground mt-1">+8% projected growth</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Breakdown</CardTitle>
              <CardDescription>Revenue, expenses, and profit for the current year</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#9b87f5" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#7E69AB" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" name="Profit" stroke="#6E59A5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Products by Revenue</CardTitle>
                <CardDescription>Year to date revenue by product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productRevenueData.map((product) => (
                    <div key={product.product} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.product}</p>
                        <p className="text-sm text-muted-foreground">{formatCurrency(product.revenue)}</p>
                      </div>
                      <Badge className={product.growth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {product.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Channel</CardTitle>
                <CardDescription>Distribution of revenue across different sales channels</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelRevenueData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `$${value / 1000}k`} />
                    <YAxis type="category" dataKey="channel" width={100} />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="#9b87f5" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenuePage;
