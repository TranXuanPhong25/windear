
import * as React from "react"
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookTableData } from "@/types/BookTableData"
import { useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link } from "react-router-dom"
import { useGetInternalBooks } from "@/hooks/admin/useGetInternalBooks"
import LoadingBlock from "@/components/layout/LoadingBlock"
import BookActions from "./BookActions";

const columns: ColumnDef<BookTableData>[] = [
   {
      accessorKey: "id",
      header: "",
      cell: "",
      // enableHiding: false,
   },
   {
      accessorKey: "imageUrl",
      header: "",
      cell: "",
      // enableHiding: false,

   },
   {
      accessorKey: "title",
      header: ({ column }) => {
         return (
            <Button
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent hover:underline !text-gray-400"
            >
               Title
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div className="text-left">{row.getValue("title")}</div>,
   },
   {
      accessorKey: "author",
      header: ({ column }) => {
         return (
            <Button
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent hover:underline !text-gray-400"
            >
               Author
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div className="text-left">{row.getValue("author")}</div>,
   },
   {
      accessorKey: "publisher",
      header: ({ column }) => {
         return (
            <Button
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent hover:underline !text-gray-400"
            >
               Publisher
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div className="text-left">{row.getValue("publisher")}</div>,
   }
   ,
   {
      accessorKey: "releaseDate",
      header: ({ column }) => {
         return (
            <Button
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent hover:underline !text-gray-400"
            >
               Published At
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div>{new Date(row.getValue("releaseDate")).toLocaleDateString()}</div>,
   },
   {
      accessorKey: "addDate",
      header: ({ column }) => {
         return (
            <Button
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent hover:underline !text-gray-400"
            >
               Added At
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div>{new Date(row.getValue("addDate")).toLocaleDateString()}</div>,

   },
   {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
         const book = row.original;
         return (
            <BookActions book={book} />
         )
      },
   },

]

export default function BooksTable() {
   const { data, isLoading, error } = useGetInternalBooks();
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   )
   const [columnVisibility, setColumnVisibility] = React.useState({})
   const [rowSelection, setRowSelection] = React.useState({})
   const [filterColumn, setFilterColumn] = React.useState("name");
   const [filterValue, setFilterValue] = React.useState("");

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
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
   })

   useEffect(() => {
      table.getAllColumns().forEach((column) => {
         if (column.id === "imageUrl") {
            column.toggleVisibility(false);
         } else if (column.id === "id") {
            column.toggleVisibility(false);
         }

      })
   }, [table]);
   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value);
      setColumnFilters([{ id: filterColumn, value: e.target.value }]);
   };
   if (isLoading) {
      return <LoadingBlock />
   }
   if (error) {
      return <div>{error.message}</div>
   }
   return (
      <div className="w-full ">
         <div className="flex items-center py-4 flex-wrap gap-2">
            <Select value={filterColumn} onValueChange={setFilterColumn}>
               <SelectTrigger className="w-28">
                  <SelectValue placeholder="Select column" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
               </SelectContent>
            </Select>
            <Input
               value={filterValue}
               onChange={handleFilterChange}
               placeholder={`Filter by ${filterColumn}`}
               className=" max-w-sm "
            />
         </div>
         <div className="rounded-md border">
            <TooltipProvider>
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
                              )
                           })}
                        </TableRow>
                     ))}
                  </TableHeader>
                  <TableBody>
                     {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                           <TableRow
                              className=""
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                           >
                              {row.getVisibleCells().map((cell) => (
                                 cell.column.id === "actions" ? <TableCell key={cell.id}>
                                    {flexRender(
                                       cell.column.columnDef.cell,
                                       cell.getContext()
                                    )}
                                 </TableCell>
                                    :
                                    <TableCell key={cell.id}>
                                       <Tooltip>
                                          <TooltipTrigger>
                                             <Link to={"/books/" + row.getValue("id")} target="_blank">
                                                {flexRender(
                                                   cell.column.columnDef.cell,
                                                   cell.getContext()
                                                )}
                                             </Link>
                                          </TooltipTrigger>
                                          <TooltipContent className="p-0">
                                             <div className="p-0">
                                                <img src={row.getValue("imageUrl")} alt="Book cover" className="h-32 w-24" />
                                             </div>
                                          </TooltipContent>
                                       </Tooltip>
                                    </TableCell>
                              ))}
                           </TableRow>
                        ))
                     ) : (
                        <TableRow>
                           <TableCell
                              colSpan={columns.length}
                              className="h-24 text-center"
                           >
                              No results.
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </TooltipProvider>
         </div>
         <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
               {table.getFilteredSelectedRowModel().rows.length} of{" "}
               {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
               >
                  Previous
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
               >
                  Next
               </Button>
            </div>
         </div>
      </div>
   )
}