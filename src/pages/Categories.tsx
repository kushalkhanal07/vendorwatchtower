
import React from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productsCount: number;
  vendorsCount: number;
  status: string;
}

const categories: Category[] = [
  { id: 1, name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets', productsCount: 156, vendorsCount: 12, status: 'active' },
  { id: 2, name: 'Clothing', slug: 'clothing', description: 'Apparel and fashion items', productsCount: 243, vendorsCount: 18, status: 'active' },
  { id: 3, name: 'Food', slug: 'food', description: 'Food and beverage products', productsCount: 98, vendorsCount: 8, status: 'active' },
  { id: 4, name: 'Furniture', slug: 'furniture', description: 'Home and office furniture', productsCount: 76, vendorsCount: 6, status: 'active' },
  { id: 5, name: 'Sports', slug: 'sports', description: 'Sports equipment and gear', productsCount: 112, vendorsCount: 9, status: 'active' },
  { id: 6, name: 'Cosmetics', slug: 'cosmetics', description: 'Beauty and personal care', productsCount: 134, vendorsCount: 11, status: 'active' },
  { id: 7, name: 'Toys', slug: 'toys', description: 'Toys and games', productsCount: 89, vendorsCount: 7, status: 'inactive' },
  { id: 8, name: 'Health', slug: 'health', description: 'Health and wellness products', productsCount: 67, vendorsCount: 5, status: 'active' },
  { id: 9, name: 'Books', slug: 'books', description: 'Books and publications', productsCount: 210, vendorsCount: 4, status: 'active' },
  { id: 10, name: 'Pet Supplies', slug: 'pet-supplies', description: 'Products for pets', productsCount: 45, vendorsCount: 3, status: 'inactive' },
];

export default function Categories() {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Category Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => (
        <div className="font-mono text-xs text-muted-foreground">{row.getValue('slug')}</div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'productsCount',
      header: 'Products',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('productsCount')}</div>
      ),
    },
    {
      accessorKey: 'vendorsCount',
      header: 'Vendors',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('vendorsCount')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        
        return (
          <div className="flex justify-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
              'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const category = row.original;
        
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
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Manage product categories used by vendors</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={categories} 
        searchColumn="name"
        searchPlaceholder="Search categories..."
      />
    </div>
  );
}
