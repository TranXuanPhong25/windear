
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { User } from "@/types/User"
import EmailVerified from "./EmailVerified"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { calculateLastLoginTime } from "@/lib/utils"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SendEmailButton from "@/components/auth/SendEmailButton"



const columns: ColumnDef<User>[] = [
   // {
   //    id: "select",
   //    header: ({ table }) => (
   //       <Checkbox
   //          checked={table.getIsAllPageRowsSelected()}
   //          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
   //          aria-label="Select all"
   //       />
   //    ),
   //    cell: ({ row }) => (
   //       <Checkbox
   //          checked={row.getIsSelected()}
   //          onCheckedChange={(value) => row.toggleSelected(!!value)}
   //          aria-label="Select row"
   //       />
   //    ),
   //    enableSorting: false,
   //    enableHiding: false,
   // },
   {
      accessorKey: "user id",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               ID
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div >{row.getValue("user id")}</div>,
   },
   {
      accessorKey: "name",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Name
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div className="flex">
         <Avatar>
            <AvatarImage
               className="size-10 rounded-full"
               src={row.getValue("picture")}
               alt={row.getValue("name")}
               width={50}
               height={50}
               loading="lazy"

            />
            <AvatarFallback className="size-10">
               {typeof row.getValue("name") === "string" && (row.getValue("name") as string).charAt(0)}
            </AvatarFallback>
         </Avatar>
         <div className="flex flex-col justify-center ml-2">
            <div>{row.getValue("name")}</div>
            <div>{row.getValue("email")}</div>
         </div>
      </div>,
   },
   {
      accessorKey: "picture",
      header: () => <div className="hidden"></div>,
      cell: () => <div className="hidden"></div>,
   },
   {
      accessorKey: "email",
      header: () => <div className="hidden"></div>,
      cell: () => <div className="hidden"></div>,
   },
   {
      accessorKey: "email verified",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Email Verified
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <EmailVerified isVerified={row.getValue("email verified")} />
   },
   {
      accessorKey: "created at",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Create at
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div>{new Date(row.getValue("created at")).toLocaleDateString("en-us")}</div>,
   },
   {
      accessorKey: "logins count",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Logins count
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div >{row.getValue("logins count")}</div>,
   },
   {
      accessorKey: "last login",
      header: ({ column }) => {
         return (
            <Button

               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
               className="px-0 !bg-transparent  hover:underline !text-gray-400"
            >
               Last login
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => <div>{calculateLastLoginTime(row.getValue("last login"))}</div>,
   },
   {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
         const user = row.original

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
                     onClick={() => navigator.clipboard.writeText(user.user_id)}
                  >
                     Copy user ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {
                     row.getValue("user id")!==undefined&&(row.getValue("user id")as string).includes("auth0") && (
                        <DropdownMenuItem>
                           <SendEmailButton userId={row.getValue("user id")}>
                              Send verification email
                           </SendEmailButton>
                        </DropdownMenuItem>
                     )
                  }
                  <DropdownMenuItem>Edit user</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         )
      },
   },
]

export default function UsersTable({ data }: { data: User[] }) {
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
      }
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
            {/* <Input
               placeholder="Filter names..."
               value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
               onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />
            <Input
               placeholder="Filter emails..."
               value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
               onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
               }
               className="max-w-sm mx-2"
            /> */}
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
                     .filter((column)=> column.id!="picture" && column.id!="email")
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

