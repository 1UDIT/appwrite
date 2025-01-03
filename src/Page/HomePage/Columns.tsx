import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import React, { HTMLProps } from "react";
import { storage } from "@/lib/configDatabase";

export type Person = {
    Object: string,
    Category: string,
    Type: String,
    Media: String,
    status: string,
    progress: string,
    index: string,
    date: string,
    srcdes: string,
}

const getImageUrl = (fileId: string) => {
    const bucketId = '6748205b000e38d388a6';
    return storage.getFileView(bucketId, fileId);
};

export const columns: ColumnDef<Person>[] = [
    {
        accessorKey: 'select',
        header: ({ table }) => (
            <div className="px-1 justify-start flex">
                <IndeterminateCheckbox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="px-1 justify-start flex">
                <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            </div>
        ),
        size: 15,
        enableColumnFilter: false,
        enableSorting: false
    },
    {
        accessorKey: 'imageFileId',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost" className="justify-start font-bold text-base tableHeaderSize text-left"
                >
                    Image
                </Button>
            )
        },
        cell: (info: any) => {
            {/* {getImageUrl(info.getValue())} */ }
            return (
                <img src={getImageUrl(info.getValue())} alt="img" className="w-full h-16 px-4"/>
            )
        },
        size: 40,  
    },
    {
        accessorKey: 'Topic',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost" className="justify-start font-bold text-base tableHeaderSize text-left"
                >
                    Topic
                </Button>
            )
        },
        cell: (info: any) => { return (<div className="text-left" title={info.getValue()}>{info.getValue()}</div>) },
        size: 230,
        minSize: 45,
        sortDescFirst: true,
        sortUndefined: 1,
    },
    {
        accessorKey: 'Description',
        cell: (info: any) => { return (<span className="pr-2 tableHeaderSize" title={info.getValue()}>{info.getValue()}</span>) },
        header: ({ column }) => {
            return (<>
                <Button
                    variant="ghost" className="font-bold text-base tableHeaderSize"
                >
                    Description
                </Button>
            </>
            )
        },
        sortDescFirst: false,
        size: 250,
    },

]


function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}