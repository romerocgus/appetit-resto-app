'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { type ReactTable, type RowData } from '@tanstack/react-table';
import { Settings2, Trash2 } from 'lucide-react';
import { type DataTableFeatures } from '../data-table-features';

export function DataTableHead<TData extends RowData>({
  table,
  selectedProducts,
}: {
  table: ReactTable<DataTableFeatures, TData>;
  selectedProducts: string[];
}) {
  const showDeleteButton = selectedProducts.length > 0;
  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <Input
        placeholder="Filter products"
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('name')?.setFilterValue(event.target.value)
        }
        className="max-w-2xs"
      />
      <div className="flex gap-1">
        {showDeleteButton && (
          <Button variant="destructive" size="sm" className="h-8">
            <Trash2 />
            {`Delete ${selectedProducts.length}`}
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Settings2 />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-37.5">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide(),
              )
              .map((column) => {
                const label =
                  (column.columnDef.meta as { label?: string })?.label ??
                  column.id;
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
