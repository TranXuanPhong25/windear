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
import {ArrowUpDown} from 'lucide-react';

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useEffect} from "react"
import LoadingBlock from "@/components/layout/LoadingBlock"
import {BorrowingRequest, BorrowingRequestStatus} from "@/models/BorrowingRequest.ts";
import {handlePlural} from "@/lib/utils.ts";
import BorrowingRequestAction from "@/components/admin/management/borrowing/BorrowingRequestAction.tsx";
import {useGetBorrowingRequest} from "@/hooks/admin/useGetBorrowingRequest.ts";
import {Link} from "react-router-dom";

const columns: ColumnDef<BorrowingRequest>[] = [
    {
        accessorKey: "userId",
        header: ({column}) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 !bg-transparent hover:underline !text-gray-400"
                >
                    UserID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div>{row.getValue("userId")}</div>,
        // enableHiding: false,
    },
    {
        accessorKey: "bookId",
        header: "",
        cell: "",
    },
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 !bg-transparent hover:underline !text-gray-400"
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <Link to={"/books/" + row.getValue("bookId")} target="_blank">{row.getValue("title")}</Link>,
    },
    {
        accessorKey: "authorName",
        header: ({column}) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 !bg-transparent hover:underline !text-gray-400"
                >
                    Author
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div>{row.getValue("authorName")}</div>,
    },
    {
        accessorKey: "requestDate",
        header: ({column}) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 !bg-transparent hover:underline !text-gray-400"
                >
                    Request At
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="flex flex-col ">
            <span>{new Date(row.getValue("requestDate")).toDateString()}</span>
            <span>{new Date(row.getValue("requestDate")).toLocaleTimeString()}</span>

        </div>,
    },
    {
        accessorKey: "borrowDate",
        header: ({column}) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 !bg-transparent hover:underline !text-gray-400"
                >
                    Borrow At
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            return row.getValue("borrowDate") ? <div className="flex flex-col ">
                    <span>{new Date(row.getValue("requestDate")).toDateString()}</span>
                    <span>{new Date(row.getValue("requestDate")).toLocaleTimeString()}</span>
                </div>
                : <span className="text-red-500">Not Accepted yet</span>
        }
    },
    {
        accessorKey: "borrowTime",
        header: ({column}) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 !bg-transparent hover:underline !text-gray-400"
                >
                    Time
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div>{handlePlural(row.getValue("borrowTime"), "Day")}</div>,
    },
    {
        accessorKey: "returnDate",
        header: ({column}) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 !bg-transparent hover:underline !text-gray-400"
                >
                    Return At
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {

            if (!row.getValue("borrowDate")) return null
            const isOverDue = new Date(row.getValue("borrowDate")).getTime() + (row.getValue("borrowTime") as number) * 24 * 60 * 60 * 1000 < new Date().getTime();
            const text = isOverDue ? "Overdue" : "Not return yet";
            return <span className={`bg-${isOverDue && "red"}-500 rounded-full`}>{
                row.getValue("returnDate") ? <div className="flex flex-col ">
                    <span>{new Date(row.getValue("requestDate")).toDateString()}</span>
                    <span>{new Date(row.getValue("requestDate")).toLocaleTimeString()}</span>
                </div> : <span className={isOverDue?"p-2  px-3":""}>
                    {text}
                </span>
            }</span>
        }

    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="px-0 !bg-transparent hover:underline !text-gray-400"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) =>
            row.getValue("status") === BorrowingRequestStatus.ACCEPTED ?
                <span className="bg-green-500  p-2 rounded-full px-3 text-white ">Accepted</span> :
                row.getValue("status") === BorrowingRequestStatus.DECLINED ?
                    <span className="bg-red-500 p-2 rounded-full px-3 text-white">Declined</span>
                    : row.getValue("status") === BorrowingRequestStatus.PENDING ?
                        <span className="bg-yellow-400 p-2 rounded-full px-3 text-black">Pending</span>
                        : row.getValue("status") === BorrowingRequestStatus.SUBSCRIBED ?
                            <span className="bg-blue-500 p-2 rounded-full px-3 text-white">Subscribed</span>
                            : null


    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            if (row.original.status === BorrowingRequestStatus.SUBSCRIBED) {
                return null;
            }
            const loanId = {
                userId: row.original.userId,
                bookId: row.original.bookId,
                requestDate: row.original.requestDate,
            };
            return <BorrowingRequestAction loanId={loanId}/>
        },
    },

]

export default function BorrowingRequestTable() {

    const {data, isLoading, error} = useGetBorrowingRequest();
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [filterColumn, setFilterColumn] = React.useState("title");
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
            if (column.id === "bookId") {
                column.toggleVisibility(false);
            }
        })
    }, [table]);
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
        setColumnFilters([{id: filterColumn, value: e.target.value}]);
    };
    if (isLoading) {
        return <LoadingBlock className="h-[60vh] !bg-transparent"/>
    }
    if (error) {
        return <div>{error.message}</div>
    }
    return (
        <div className="w-full ">
            <div className="flex items-center py-4 flex-wrap gap-2">
                <Select value={filterColumn} onValueChange={setFilterColumn}>
                    <SelectTrigger className="w-28">
                        <SelectValue placeholder="Select column"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="userId">UserID</SelectItem>
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