'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductWithRelations } from '@/lib/requests';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import ImageComponent from '../image-component';
import TableActionsCell from './components/table-actions-cell';
import { type DataTableFeatures } from './data-table-features';

const columnHelper = createColumnHelper<
  DataTableFeatures,
  ProductWithRelations
>();

export const createColumns = (t: (key: string) => string) =>
  columnHelper.columns([
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
      meta: { label: t('image') },
      header: t('image'),
      cell: (info) => (
        <ImageComponent
          src={info.getValue()}
          alt="product Image"
          width={40}
          height={40}
        />
      ),
    }),
    columnHelper.accessor('name', {
      meta: { label: t('name') },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            role="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('name')}
            <ArrowUpDown />
          </Button>
        );
      },
    }),
    columnHelper.accessor('description', {
      meta: { label: t('description') },
      header: t('description'),
      cell: (info) => {
        const value = info.getValue();
        return <div title={value}>{value}</div>;
      },
    }),
    columnHelper.accessor('category', {
      meta: { label: t('category') },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            role="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-auto"
          >
            {t('category')}
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
      meta: { label: t('tags') },
      header: t('tags'),
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
      meta: { label: t('availability') },
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            role="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="ml-auto"
          >
            {t('availability')}
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
      meta: { label: t('price') },
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              role="button"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
              className="ml-auto"
            >
              {t('price')}
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
        const product = row.original;
        return <TableActionsCell productId={product.id} />;
      },
      enableSorting: false,
      enableHiding: false,
    }),
  ]);
