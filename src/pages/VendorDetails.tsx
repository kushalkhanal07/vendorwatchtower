
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, ShoppingBag, DollarSign, Star, Users, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';

export default function VendorDetails() {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch vendor data based on the ID
  // For demo purposes, we'll use static data
  const vendor = {
    id: Number(id),
    name: 'Tech Solutions Inc.',
    email: 'contact@techsolutions.com',
    phone: '+1 (555) 123-4567',
    website: 'https://techsolutions.example.com',
    address: '123 Tech Blvd, San Francisco, CA 94107',
    category: 'Electronics',
    status: 'active',
    joinDate: '2023-01-15',
    description: 'Tech Solutions Inc. is a leading provider of cutting-edge electronics and gadgets. They specialize in smartphones, laptops, and smart home devices with a focus on quality and innovation.'
  };
  
  // Mock products data
  const products = [
    { id: 1, name: 'Smartphone X', sku: 'SP-001', price: 699, stock: 45, category: 'Smartphones', status: 'in_stock' },
    { id: 2, name: 'Laptop Pro', sku: 'LT-002', price: 1299, stock: 23, category: 'Laptops', status: 'in_stock' },
    { id: 3, name: 'Wireless Earbuds', sku: 'AUD-003', price: 129, stock: 78, category: 'Audio', status: 'in_stock' },
    { id: 4, name: 'Smart Watch', sku: 'SW-004', price: 249, stock: 32, category: 'Wearables', status: 'in_stock' },
    { id: 5, name: 'Tablet Air', sku: 'TB-005', price: 499, stock: 0, category: 'Tablets', status: 'out_of_stock' },
  ];
  
  // Mock sales data
  const sales = [
    { id: 1, orderId: 'ORD-001', date: '2023-06-01', customer: 'John Doe', amount: 699, status: 'completed' },
    { id: 2, orderId: 'ORD-002', date: '2023-06-05', customer: 'Jane Smith', amount: 1299, status: 'completed' },
    { id: 3, orderId: 'ORD-003', date: '2023-06-10', customer: 'Bob Johnson', amount: 378, status: 'pending' },
    { id: 4, orderId: 'ORD-004', date: '2023-06-15', customer: 'Alice Brown', amount: 249, status: 'completed' },
    { id: 5, orderId: 'ORD-005', date: '2023-06-20', customer: 'Charlie Green', amount: 499, status: 'cancelled' },
  ];
  
  // Product columns for DataTable
  const productColumns = [
    {
      accessorKey: 'name',
      header: 'Product Name',
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        return (
          <div className="text-right">
            ${row.getValue('price')}
          </div>
        );
      },
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {row.getValue('stock')}
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
              status === 'in_stock' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
              'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
            }`}>
              {status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        );
      },
    },
  ];
  
  // Sales columns for DataTable
  const salesColumns = [
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
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        return (
          <div className="text-right">
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
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/vendors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-3xl font-bold tracking-tight">{vendor.name}</h2>
          <Button variant="outline" asChild>
            <Link to={`/vendors/edit/${id}`} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Vendor
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Vendor Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{vendor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{vendor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <a href={vendor.website} className="hover:underline" target="_blank" rel="noopener noreferrer">
                  {vendor.website}
                </a>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1" />
                <span>{vendor.address}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{vendor.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vendor.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                  vendor.status === 'inactive' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' : 
                  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Join Date:</span>
                <span className="font-medium">{new Date(vendor.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{vendor.description}</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard
              title="Products"
              value={products.length.toString()}
              icon={<ShoppingBag className="h-5 w-5" />}
            />
            <StatCard
              title="Sales"
              value={formatCurrency(3124)}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <StatCard
              title="Rating"
              value="4.8"
              icon={<Star className="h-5 w-5" />}
            />
          </div>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="products">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="products" className="text-sm">Products</TabsTrigger>
                  <TabsTrigger value="sales" className="text-sm">Sales</TabsTrigger>
                </TabsList>
                <TabsContent value="products" className="pt-4">
                  <DataTable 
                    columns={productColumns}
                    data={products}
                    searchColumn="name"
                    searchPlaceholder="Search products..."
                  />
                </TabsContent>
                <TabsContent value="sales" className="pt-4">
                  <DataTable 
                    columns={salesColumns}
                    data={sales}
                    searchColumn="orderId"
                    searchPlaceholder="Search orders..."
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
