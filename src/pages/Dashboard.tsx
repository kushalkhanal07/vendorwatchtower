
import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ShoppingBag, 
  FolderTree, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart4,
  ArrowRightCircle
} from 'lucide-react';
import { Line, Bar, ResponsiveContainer, LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';

const salesData = [
  { name: 'Jan', total: 1500 },
  { name: 'Feb', total: 2300 },
  { name: 'Mar', total: 2800 },
  { name: 'Apr', total: 3500 },
  { name: 'May', total: 2900 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4200 },
];

const vendorsData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 27 },
  { name: 'Food', value: 18 },
  { name: 'Furniture', value: 12 },
  { name: 'Others', value: 8 },
];

const recentVendors = [
  { id: 1, name: 'Tech Solutions Inc.', type: 'Electronics', date: '2023-06-15', status: 'active' },
  { id: 2, name: 'Fashion Forward', type: 'Clothing', date: '2023-06-14', status: 'active' },
  { id: 3, name: 'Gourmet Delights', type: 'Food', date: '2023-06-12', status: 'pending' },
  { id: 4, name: 'Home Essentials', type: 'Furniture', date: '2023-06-10', status: 'active' },
];

export default function Dashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vendors"
          value="124"
          icon={<Users className="h-5 w-5" />}
          change={{ value: "12%", positive: true }}
          footer="12 new vendors this month"
        />
        <StatCard
          title="Total Products"
          value="3,567"
          icon={<ShoppingBag className="h-5 w-5" />}
          change={{ value: "8%", positive: true }}
          footer="245 new products this month"
        />
        <StatCard
          title="Categories"
          value="56"
          icon={<FolderTree className="h-5 w-5" />}
          change={{ value: "3%", positive: true }}
          footer="2 new categories this month"
        />
        <StatCard
          title="Total Sales"
          value={formatCurrency(487500)}
          icon={<DollarSign className="h-5 w-5" />}
          change={{ value: "5%", positive: false }}
          footer="Down from last month"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="col-span-1 lg:col-span-4 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center justify-between">
              Sales Overview
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Sales']} 
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  dot={{ r: 3, strokeWidth: 2 }} 
                  activeDot={{ r: 5, strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center justify-between">
              Vendors by Category
              <BarChart4 className="h-5 w-5 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendorsData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Vendors']} 
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Vendors */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            Recent Vendors
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              View All <ArrowRightCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium">Vendor</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Date Added</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4">{vendor.name}</td>
                    <td className="py-3 px-4">{vendor.type}</td>
                    <td className="py-3 px-4">{new Date(vendor.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        vendor.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
