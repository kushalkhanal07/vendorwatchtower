
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Package, PieChart, ShoppingCart, Truck, Tag, Landmark, BarChart2 } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from "@/components/ui/badge";

// This would come from API in a real app
const products = [
  { id: 1, name: 'Smartphone X', sku: 'SP-001', vendor: 'Tech Solutions Inc.', vendorId: 1, category: 'Electronics', price: 699, stock: 45, status: 'in_stock', description: 'The latest smartphone with cutting-edge features and exceptional camera quality.', imageUrl: '/placeholder.svg' },
  { id: 2, name: 'Laptop Pro', sku: 'LT-002', vendor: 'Tech Solutions Inc.', vendorId: 1, category: 'Electronics', price: 1299, stock: 23, status: 'in_stock', description: 'High-performance laptop for professionals and gamers with dedicated graphics.', imageUrl: '/placeholder.svg' },
  { id: 3, name: 'Designer T-Shirt', sku: 'TS-003', vendor: 'Fashion Forward', vendorId: 2, category: 'Clothing', price: 49, stock: 78, status: 'in_stock', description: 'Premium cotton t-shirt with exclusive designer prints.', imageUrl: '/placeholder.svg' },
  { id: 4, name: 'Leather Jacket', sku: 'LJ-004', vendor: 'Fashion Forward', vendorId: 2, category: 'Clothing', price: 199, stock: 12, status: 'in_stock', description: 'Genuine leather jacket with modern styling and premium finish.', imageUrl: '/placeholder.svg' },
  { id: 5, name: 'Organic Coffee', sku: 'OC-005', vendor: 'Gourmet Delights', vendorId: 3, category: 'Food', price: 15, stock: 56, status: 'in_stock', description: 'Fair trade organic coffee beans from sustainable farms.', imageUrl: '/placeholder.svg' },
];

// Mock sales data
const salesData = [
  { id: 1, date: '2023-08-15', quantity: 5, totalAmount: 3495, customerName: 'Retail Store A' },
  { id: 2, date: '2023-07-22', quantity: 3, totalAmount: 2097, customerName: 'Online Store B' },
  { id: 3, date: '2023-06-10', quantity: 2, totalAmount: 1398, customerName: 'Distribution Center C' },
  { id: 4, date: '2023-05-05', quantity: 10, totalAmount: 6990, customerName: 'Wholesale Buyer D' },
  { id: 5, date: '2023-04-18', quantity: 1, totalAmount: 699, customerName: 'Individual Customer E' },
];

export default function ProductDetails() {
  const { id } = useParams();
  const productId = parseInt(id || '0');
  
  // Find the product by ID
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  // Table columns for sales history
  const salesColumns = [
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
    },
    {
      accessorKey: 'totalAmount',
      header: 'Amount',
      cell: ({ row }: any) => {
        return <div className="font-medium">${row.getValue('totalAmount')}</div>;
      },
    },
    {
      accessorKey: 'customerName',
      header: 'Customer',
    }
  ];

  // Calculate total sales
  const totalSales = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link to="/products">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">{product.name}</h2>
            <Badge className={`ml-2 ${product.status === 'in_stock' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'}`}>
              {product.status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
          <p className="text-muted-foreground">SKU: {product.sku} • Added 3 months ago</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            Edit Product
          </Button>
          <Button variant="destructive">
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Product Name</h3>
                    <p>{product.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
                    <p>{product.description}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Category</h3>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{product.category}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Vendor</h3>
                    <div className="flex items-center">
                      <Landmark className="h-4 w-4 mr-2 text-muted-foreground" />
                      <Link to={`/vendors/${product.vendorId}`} className="text-primary hover:underline">
                        {product.vendor}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Price</h3>
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Stock Level</h3>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{product.stock} units</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Total Sales</h3>
                    <div className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{totalSales} units sold</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Revenue Generated</h3>
                    <div className="flex items-center">
                      <PieChart className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>${totalRevenue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sales History</CardTitle>
              <CardDescription>Recent sales transactions for this product</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={salesColumns}
                data={salesData}
                searchColumn="customerName"
                searchPlaceholder="Search by customer..."
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Product Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-secondary/50 rounded-md">
                <div className="text-center">
                  <BarChart2 className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Sales chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
