'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from './data-table-features';
import {
  MoreHorizontal,
  PenLine,
  Trash2,
  Copy,
  ArrowUpDown,
  Tag,
  Tags,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductWithRelations } from '@/lib/requests';

const columnHelper = createColumnHelper<
  DataTableFeatures,
  ProductWithRelations
>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: ({ row }) => {
      const product = row.original;
      return product.category.name;
    },
  }),
  columnHelper.accessor('tags', {
    header: 'Tags',
    cell: ({ row }) => {
      const product = row.original;
      const tags = product.tags.map((tag) => tag.name);
      return (
        <ul>
          {tags.length > 0 && tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      );
    },
  }),
  columnHelper.accessor('price', {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);

      return <div className="text-right font-normal">{formatted}</div>;
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original; //for accessing row data

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              <Copy />
              <span>Copy product ID</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PenLine />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  }),
]);
