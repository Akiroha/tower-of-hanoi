'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StepType } from '@/types';
import useHanoi from '@/zustand/hanoi-store';
import { useShallow } from 'zustand/react/shallow';
import { useSolve } from '@/hooks';

const soloClass = `w-full h-full`;
const twinColsRowsClassStep = `grow-0 w-[100%] h-[40%]`;

export const columns: ColumnDef<StepType>[] = [
  {
    id: 'select',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'stepNumber',
    header: 'Step #',
    cell: ({ row }) => <div>{row.getValue('stepNumber')}</div>,
  },
  {
    accessorKey: 'actionTaken',
    header: 'Action Taken',
    cell: ({ row }) => <div>{row.getValue('actionTaken')}</div>,
  },
];

interface Props {
  data: StepType[];
}

const StepsTable = ({ data }: Props) => {
  const [
    selectedStepIndex,
    apiData,
    pageIndex,
    hasNext,
    hasPrev,
    diskNumber,
    setSelectedStepIndex,
    setPageIndex,
  ] = useHanoi(
    useShallow((state) => [
      state.selectedStepIndex,
      state.data,
      state.pageIndex,
      state.hasNext,
      state.hasPrev,
      state.diskNumber,
      state.setSelectedStepIndex,
      state.setPageIndex,
    ])
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { hitApi } = useSolve();

  React.useEffect(() => {
    if (!rowSelection) {
      setSelectedStepIndex(undefined);
      return;
    }
    const index = Number(Object.keys(rowSelection)[0]);
    setSelectedStepIndex(index);
  }, [rowSelection]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const stepsClass = `grow-0 overflow-y-auto rounded-md border flex flex-col justify-between ${Number(selectedStepIndex) >= 0 ? twinColsRowsClassStep : soloClass}`;

  const handleNext = async () => {
    const nextIndex = pageIndex + 1;
    setPageIndex(nextIndex);
    hitApi(diskNumber || 0, nextIndex);
  };

  const handlePrev = async () => {
    const prevIndex = pageIndex - 1;
    setPageIndex(prevIndex);
    hitApi(diskNumber || 0, prevIndex);
  };

  return (
    <div className={stepsClass}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="cursor-pointer"
                onClick={() => row.toggleSelected()}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {`Page ${pageIndex + 1} of ${apiData?.pageCount.toLocaleString()}`}
        </div>
        <div className="space-x-2">
          {hasPrev && (
            <Button variant="outline" size="sm" onClick={() => handlePrev()}>
              Previous
            </Button>
          )}
          {hasNext && (
            <Button variant="outline" size="sm" onClick={() => handleNext()}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepsTable;
