
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
import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Auth0Log } from "@/types/Auth0Log"
import { Input } from "@/components/ui/input"
import BooleanBadge from "../../BooleanBadge"
import { extractLogType } from "@/lib/extractLogType"

const columns: ColumnDef<Auth0Log>[] = [
  
   {
      accessorKey: "user id",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               User ID
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div>{row.getValue("user id")}</div>,
   },
   {
      accessorKey: "user name",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Username
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div>{row.getValue("user name")}</div>,
   },
   
   {
      accessorKey: "ip",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Ip Address
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div>{row.getValue("ip")}</div>,
   },
   {
      accessorKey: "user agent",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               User Agent
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div>{row.getValue("user agent")}</div>,
   },
   {
      accessorKey: "type",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Type
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({row}) => <div >{extractLogType(row.getValue("type"))}</div>,
   },
   {
      accessorKey: "isMobile",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Is Mobile
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <BooleanBadge value={row.getValue("isMobile")} color={["bg-sky-400 dark:bg-sky-500","bg-green-400 dark:green-500"]}/>,
   },
   {
      accessorKey: "date",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Date
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({row}) => <div >{new Date(row.getValue("date")).toLocaleString("en-us")}</div>,
   },
]

export default function LogsTable({ data }: { data: Auth0Log[] }) {
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   )
   const [columnVisibility, setColumnVisibility] = React.useState({})
   const [rowSelection, setRowSelection] = React.useState({})
   const [filterColumn, setFilterColumn] = React.useState("user name");
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
   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value);
      setColumnFilters([{ id: filterColumn, value: e.target.value }]);
   };
   return (
      <div className="w-full ">
         <div className="flex items-center py-4 flex-wrap gap-2">
         <Select value={filterColumn} onValueChange={setFilterColumn}>
               <SelectTrigger className="w-28">
                  <SelectValue placeholder="Select column" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="user name">Username</SelectItem>
                  <SelectItem value="user agent">User Agent</SelectItem>
               </SelectContent>
            </Select>
            <Input
               value={filterValue}
               onChange={handleFilterChange}
               placeholder={`Filter by ${filterColumn}`}
               className=" max-w-sm "
            />
            <Select
               value={(table.getColumn("user id")?.getFilterValue() as string) ?? ""}
               onValueChange={(value) =>
                  table.getColumn("user id")?.setFilterValue(value !== "all" ? value : "|")
               }
            >
               <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Provider" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="|">All</SelectItem>
                  <SelectItem value="auth0">Auth0</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter (X)</SelectItem>
                  <SelectItem value="github">Github</SelectItem>
               </SelectContent>
            </Select>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                     Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                 column.toggleVisibility(!!value)
                              }
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        )
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="rounded-md border">
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
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
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

