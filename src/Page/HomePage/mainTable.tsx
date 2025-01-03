import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    PaginationState,
    getPaginationRowModel,
    ColumnFiltersState,
    SortingState,
    RowSelectionState,
} from '@tanstack/react-table';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { columns } from './Columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetData } from '@/Api/GetData';
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { account } from '@/lib/configDatabase';
import { useNavigate } from 'react-router';
import PrivateRoute from '../PrivateRoute';
const PopUppage = lazy(() => import('./addData'));

export function Component() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [isLoading, data] = useGetData(); 
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const tableData = useMemo(() =>
        (isLoading === true ? Array(10).fill({}) : data),
        [isLoading, data]
    );

    const tableColumns = useMemo(
        () =>
            isLoading === true
                ? columns.map((column) => ({
                    ...column,
                    cell: () => (
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[20px] w-full rounded-xl mt-1" />
                        </div>
                    )
                }))
                : columns,
        [isLoading]
    );


    const table = useReactTable({
        data: tableData || [],
        columns: tableColumns,
        state: {
            rowSelection,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
        manualPagination: true,
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        enableMultiRowSelection: true,
        manualSorting: true,
        enableSortingRemoval: false, //Don't allow - default on/true 
    });

    useEffect(() => {
        const handleSelectionState = (selections: RowSelectionState) => {
            setSelectedRows((prev: any) =>
                Object.keys(selections).map(
                    (key) =>
                        table.getSelectedRowModel().rowsById[key]?.original ||
                        prev.find((row: any) => row._id === key),
                ),
            );
        };

        handleSelectionState(rowSelection);
    }, [rowSelection]);

    const logOut = () => {
        account.deleteSession('current');
        setTimeout(() => {
            navigate("/")
        }, 100);
    };



    return (
        <PrivateRoute>
            <header className='w-full bg-slate-400 h-12 flex justify-end items-center'>
                <div>
                    <Button onClick={() => logOut()}>Logout</Button>
                </div>
            </header>
            <div className="flex border-b-2 py-1 bg-white h-10">
                <div className="flex-initial w-9 border-r-2 border-r-slate-500">
                    <IoIosAddCircle size={30} className={`text-green-600`} onClick={() => setOpen(!false)} />
                </div>
                <div className="flex-initial w-9">
                    <MdDelete size={30} className={`${selectedRows.length > 0 ? 'text-black' : 'text-slate-500'}`} />
                </div>

            </div>
            <div className="overflow-auto lg:text-sm 2xl:text-base" style={{ height: 'calc(100vh - 300px)' }} >
                <table className={"w-full table-fixed"}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={{ position: 'relative', width: header.getSize() }}
                                            className="th select-none px-1.5 text-black  sticky top-0  bg-slate-50 drop-shadow-md"
                                        >
                                            <div className="flex justify-between items-center w-full">
                                                <span
                                                    className={`flex items-center   ${header.column.getCanFilter() ? 'w-[100%]' : 'w-[100%]'}`}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <span className='w-[70%] inline-flex items-center justify-start'> {flexRender(header.column.columnDef.header, header.getContext())}</span>
                                                </span>
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>

                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <tr
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="text-black odd:bg-[#dae0e9] h-7  even:bg-[#d4d9df]"
                                >
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id} style={{ width: cell.column.getSize() }} className='px-2'>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table >
            </div>

            {
                open === true ?
                    <Dialog onOpenChange={() => { setOpen(!open) }} open={open} modal={open}>
                        <Suspense fallback={""}>
                            <PopUppage setOpen={setOpen} />
                        </Suspense>
                    </Dialog>
                    : null
            }
        </PrivateRoute>
    )
}
