
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

interface Vendor {
  id: number;
  name: string;
  email: string;
  category: string;
  status: string;
  joinDate: string;
  productsCount: number;
}

const vendors: Vendor[] = [
  { id: 1, name: 'Tech Solutions Inc.', email: 'contact@techsolutions.com', category: 'Electronics', status: 'active', joinDate: '2023-01-15', productsCount: 52 },
  { id: 2, name: 'Fashion Forward', email: 'info@fashionforward.com', category: 'Clothing', status: 'active', joinDate: '2023-02-28', productsCount: 124 },
  { id: 3, name: 'Gourmet Delights', email: 'hello@gourmetdelights.com', category: 'Food', status: 'inactive', joinDate: '2023-03-10', productsCount: 36 },
  { id: 4, name: 'Home Essentials', email: 'support@homeessentials.com', category: 'Furniture', status: 'active', joinDate: '2023-04-05', productsCount: 87 },
  { id: 5, name: 'Outdoor Adventures', email: 'info@outdooradventures.com', category: 'Sports', status: 'pending', joinDate: '2023-05-12', productsCount: 43 },
  { id: 6, name: 'Digital Dynamics', email: 'sales@digitaldynamics.com', category: 'Electronics', status: 'active', joinDate: '2023-06-18', productsCount: 29 },
  { id: 7, name: 'Beauty Boutique', email: 'hello@beautyboutique.com', category: 'Cosmetics', status: 'active', joinDate: '2023-07-22', productsCount: 64 },
  { id: 8, name: 'Toy Emporium', email: 'contact@toyemporium.com', category: 'Toys', status: 'inactive', joinDate: '2023-08-30', productsCount: 78 },
  { id: 9, name: 'Wellness World', email: 'info@wellnessworld.com', category: 'Health', status: 'active', joinDate: '2023-09-14', productsCount: 41 },
  { id: 10, name: 'Book Haven', email: 'books@bookhaven.com', category: 'Books', status: 'active', joinDate: '2023-10-03', productsCount: 156 },
];

export default function Vendors() {
  const columns = [
    {
      accessorKey: 'name',
      header: 'Vendor Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'productsCount',
      header: 'Products',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('productsCount')}</div>
      ),
    },
    {
      accessorKey: 'joinDate',
      header: 'Join Date',
      cell: ({ row }) => {
        return (
          <div>
            {new Date(row.getValue('joinDate')).toLocaleDateString()}
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
              status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 
              status === 'inactive' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' : 
              'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
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
        const vendor = row.original;
        
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
                  <Link to={`/vendors/${vendor.id}`} className="flex items-center w-full">
                    <EyeIcon className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={`/vendors/edit/${vendor.id}`} className="flex items-center w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
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
          <h2 className="text-3xl font-bold tracking-tight">Vendors</h2>
          <p className="text-muted-foreground">Manage and monitor all vendors in your platform</p>
        </div>
        <Button asChild>
          <Link to="/vendors/add" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Vendor
          </Link>
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={vendors} 
        searchColumn="name"
        searchPlaceholder="Search vendors..."
      />
    </div>
  );
}
