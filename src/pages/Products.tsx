import React from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, EyeIcon, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Product {
  id: number;
  name: string;
  sku: string;
  vendor: string;
  vendorId: number;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const products: Product[] = [
  { id: 1, name: 'Smartphone X', sku: 'SP-001', vendor: 'Tech Solutions Inc.', vendorId: 1, category: 'Electronics', price: 699, stock: 45, status: 'in_stock' },
  { id: 2, name: 'Laptop Pro', sku: 'LT-002', vendor: 'Tech Solutions Inc.', vendorId: 1, category: 'Electronics', price: 1299, stock: 23, status: 'in_stock' },
  { id: 3, name: 'Designer T-Shirt', sku: 'TS-003', vendor: 'Fashion Forward', vendorId: 2, category: 'Clothing', price: 49, stock: 78, status: 'in_stock' },
  { id: 4, name: 'Leather Jacket', sku: 'LJ-004', vendor: 'Fashion Forward', vendorId: 2, category: 'Clothing', price: 199, stock: 12, status: 'in_stock' },
  { id: 5, name: 'Organic Coffee', sku: 'OC-005', vendor: 'Gourmet Delights', vendorId: 3, category: 'Food', price: 15, stock: 56, status: 'in_stock' },
  { id: 6, name: 'Chocolate Box', sku: 'CB-006', vendor: 'Gourmet Delights', vendorId: 3, category: 'Food', price: 29, stock: 0, status: 'out_of_stock' },
  { id: 7, name: 'Sofa Set', sku: 'SS-007', vendor: 'Home Essentials', vendorId: 4, category: 'Furniture', price: 899, stock: 5, status: 'in_stock' },
  { id: 8, name: 'Coffee Table', sku: 'CT-008', vendor: 'Home Essentials', vendorId: 4, category: 'Furniture', price: 249, stock: 8, status: 'in_stock' },
  { id: 9, name: 'Camping Tent', sku: 'CT-009', vendor: 'Outdoor Adventures', vendorId: 5, category: 'Sports', price: 159, stock: 0, status: 'out_of_stock' },
  { id: 10, name: 'Fishing Rod', sku: 'FR-010', vendor: 'Outdoor Adventures', vendorId: 5, category: 'Sports', price: 79, stock: 15, status: 'in_stock' },
];

export default function Products() {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => (
        <Link 
          to={`/products/${row.original.id}`} 
          className="text-primary hover:underline font-medium"
        >
          {row.getValue('name')}
        </Link>
      ),
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'vendor',
      header: 'Vendor',
      cell: ({ row }) => (
        <Link 
          to={`/vendors/${row.original.vendorId}`} 
          className="text-primary hover:underline"
        >
          {row.getValue('vendor')}
        </Link>
      ),
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
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;
        
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/products/${product.id}`}>
                    <EyeIcon className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">View and manage all products from your vendors</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={products} 
        searchColumn="name"
        searchPlaceholder="Search products..."
      />
    </div>
  );
}
