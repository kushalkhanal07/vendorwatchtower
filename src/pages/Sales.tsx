
import React from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from 'recharts';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Sale {
  id: number;
  orderId: string;
  customer: string;
  vendor: string;
  vendorId: number;
  date: string;
  amount: number;
  status: string;
  paymentMethod: string;
}

const sales: Sale[] = [
  { id: 1, orderId: 'ORD-001', customer: 'John Doe', vendor: 'Tech Solutions Inc.', vendorId: 1, date: '2023-06-01', amount: 699, status: 'completed', paymentMethod: 'credit_card' },
  { id: 2, orderId: 'ORD-002', customer: 'Jane Smith', vendor: 'Tech Solutions Inc.', vendorId: 1, date: '2023-06-02', amount: 1299, status: 'completed', paymentMethod: 'paypal' },
  { id: 3, orderId: 'ORD-003', customer: 'Robert Johnson', vendor: 'Fashion Forward', vendorId: 2, date: '2023-06-03', amount: 149, status: 'pending', paymentMethod: 'credit_card' },
  { id: 4, orderId: 'ORD-004', customer: 'Emily Davis', vendor: 'Gourmet Delights', vendorId: 3, date: '2023-06-04', amount: 59, status: 'completed', paymentMethod: 'credit_card' },
  { id: 5, orderId: 'ORD-005', customer: 'Michael Wilson', vendor: 'Home Essentials', vendorId: 4, date: '2023-06-05', amount: 899, status: 'cancelled', paymentMethod: 'bank_transfer' },
  { id: 6, orderId: 'ORD-006', customer: 'Sarah Taylor', vendor: 'Outdoor Adventures', vendorId: 5, date: '2023-06-06', amount: 159, status: 'completed', paymentMethod: 'credit_card' },
  { id: 7, orderId: 'ORD-007', customer: 'David Brown', vendor: 'Tech Solutions Inc.', vendorId: 1, date: '2023-06-07', amount: 249, status: 'completed', paymentMethod: 'paypal' },
  { id: 8, orderId: 'ORD-008', customer: 'Jennifer Jones', vendor: 'Fashion Forward', vendorId: 2, date: '2023-06-08', amount: 199, status: 'pending', paymentMethod: 'credit_card' },
  { id: 9, orderId: 'ORD-009', customer: 'Matthew Miller', vendor: 'Gourmet Delights', vendorId: 3, date: '2023-06-09', amount: 29, status: 'completed', paymentMethod: 'credit_card' },
  { id: 10, orderId: 'ORD-010', customer: 'Laura Garcia', vendor: 'Home Essentials', vendorId: 4, date: '2023-06-10', amount: 249, status: 'completed', paymentMethod: 'paypal' },
];

const salesData = [
  { name: 'Jan', total: 4000 },
  { name: 'Feb', total: 6000 },
  { name: 'Mar', total: 5000 },
  { name: 'Apr', total: 8000 },
  { name: 'May', total: 7000 },
  { name: 'Jun', total: 9000 },
  { name: 'Jul', total: 8500 },
  { name: 'Aug', total: 10000 },
  { name: 'Sep', total: 11000 },
  { name: 'Oct', total: 9500 },
  { name: 'Nov', total: 12000 },
  { name: 'Dec', total: 15000 },
];

export default function Sales() {
  const [period, setPeriod] = React.useState('yearly');
  
  const columns = [
    {
      accessorKey: 'orderId',
      header: 'Order ID',
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        return (
          <div>
            {new Date(row.getValue('date')).toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
    },
    {
      accessorKey: 'vendor',
      header: 'Vendor',
      cell: ({ row }) => (
        <div>
          <a 
            href={`/vendors/${row.original.vendorId}`} 
            className="text-primary hover:underline"
          >
            {row.getValue('vendor')}
          </a>
        </div>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            ${row.getValue('amount')}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        
        return (
          <div className="flex justify-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
              status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 
              'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment',
      cell: ({ row }) => {
        const method = row.getValue('paymentMethod') as string;
        let display = method;
        
        if (method === 'credit_card') display = 'Credit Card';
        if (method === 'paypal') display = 'PayPal';
        if (method === 'bank_transfer') display = 'Bank Transfer';
        
        return <div>{display}</div>;
      },
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Sales Overview</h2>
        <p className="text-muted-foreground">Monitor all sales activity and performance</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(95235)}
          icon={<DollarSign className="h-5 w-5" />}
          change={{ value: "12%", positive: true }}
          footer="Compared to last month"
        />
        <StatCard
          title="Orders"
          value="342"
          icon={<ShoppingCart className="h-5 w-5" />}
          change={{ value: "8%", positive: true }}
          footer="Compared to last month"
        />
        <StatCard
          title="Customers"
          value="2,541"
          icon={<Users className="h-5 w-5" />}
          change={{ value: "5%", positive: true }}
          footer="Compared to last month"
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon={<TrendingUp className="h-5 w-5" />}
          change={{ value: "0.5%", positive: true }}
          footer="Compared to last month"
        />
      </div>
      
      {/* Revenue Chart */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
          <Select 
            defaultValue={period} 
            onValueChange={setPeriod}
          >
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                formatter={(value) => [`$${value}`, 'Revenue']} 
                contentStyle={{ borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fill="url(#colorTotal)" 
                activeDot={{ r: 5 }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Recent Sales */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Transactions</h3>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            Download Report <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        
        <DataTable 
          columns={columns} 
          data={sales} 
          searchColumn="orderId"
          searchPlaceholder="Search orders..."
        />
      </div>
    </div>
  );
}
