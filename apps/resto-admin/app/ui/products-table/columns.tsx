'use client';

import { createColumnHelper } from '@tanstack/react-table';

import { type DataTableFeatures } from './data-table-features';
import {
  MoreHorizontal,
  PenLine,
  Trash2,
  Copy,
  ArrowUpDown,
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
import TableImage from './table-image';
import { Badge } from '@/components/ui/badge';

const columnHelper = createColumnHelper<
  DataTableFeatures,
  ProductWithRelations
>();

export const columns = columnHelper.columns([
  columnHelper.display({
    meta: { label: 'select' },
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
  columnHelper.accessor('image', {
    meta: { label: 'Image' },
    header: 'Image',
    cell: (info) => <TableImage src={info.getValue()} />,
  }),
  columnHelper.accessor('name', {
    meta: { label: 'Name' },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          role="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
  }),
  columnHelper.accessor('description', {
    meta: { label: 'Description' },
    header: 'Description',
    cell: (info) => {
      const value = info.getValue();
      return <div title={value}>{value}</div>;
    },
  }),
  columnHelper.accessor('category', {
    meta: { label: 'Category' },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          role="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="ml-auto"
        >
          Category
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return product.category.name;
    },
  }),
  columnHelper.accessor('tags', {
    meta: { label: 'Tags' },
    header: 'Tags',
    cell: (info) => {
      const tags = info.getValue();
      return (
        tags.length > 0 && (
          <ul className="space-y-0.5">
            {tags.map((tag) => (
              <li key={tag.id}>
                <Badge
                  variant="outline"
                  style={{ color: tag.color || '#ffff' }}
                  className="border-current "
                >
                  {tag.name}
                </Badge>
              </li>
            ))}
          </ul>
        )
      );
    },
  }),
  columnHelper.accessor('isAvailable', {
    meta: { label: 'Availability' },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          role="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="ml-auto"
        >
          Availability
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isAvailable = row.getValue('isAvailable');

      return isAvailable ? (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          Available
        </Badge>
      ) : (
        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
          Not available
        </Badge>
      );
    },
  }),
  columnHelper.accessor('price', {
    meta: { label: 'Price' },
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            role="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-auto"
          >
            Price
            <ArrowUpDown />
          </Button>
        </div>
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
    meta: { label: 'actions' },
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original; //for accessing row data

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-end">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
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
