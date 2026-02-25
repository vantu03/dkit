import { HiMiniChevronDown, HiMiniChevronUp, HiMiniChevronUpDown } from "react-icons/hi2";
import LoadingSpinner from "./loading-spinner";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import React, { useState } from "react";
import clsx from "clsx";

export interface AppTableColumn<T> {
    key: string;
    dataIndex?: string;
    title: React.ReactNode;
    width?: number | string;
    align?: "left" | "center" | "right";
    render?: (data: any, rowData: T, rowIndex: number) => React.ReactNode;
    sorter?: boolean;
    ellipsis?: boolean;
}

export interface AppTableProps<T> {
    columns: AppTableColumn<T>[];
    data: T[];
    rowKey: string | ((record: T) => string);
    loading?: boolean;
    onSortChange?: (sorter: { field: string; order: "asc" | "desc" | null }) => void;
    select?: {
        onSelectChange: (keys: React.Key[], selectedRows: T[]) => void;
        selectedRowKeys: React.Key[];
        actions?: {
            label: React.ReactNode;
            onAction: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
        }[]
    }
}

export default function AppTable<T>({
    columns,
    data,
    rowKey,
    loading,
    onSortChange,
    select,
}: AppTableProps<T>) {

    const [sorter, setSorter] = useState<{ field: string; order: "asc" | "desc" | null }>();

    const getRowKey = (record: T): React.Key =>
        typeof rowKey === "function"
            ? rowKey(record)
            : (record as any)[rowKey];

    return (
        <div className="w-full bg-ink-0 relative flex flex-col gap-md">

            <div className="w-full overflow-x-auto">

                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            {select && (
                                <th className={clsx(
                                    "border-y px-md py-md text-left",
                                    "font-medium text-primary-100 hover:text-ink bg-primary"
                                )}>
                                    <div className="flex items-center gap-xs">
                                        <input
                                            type="checkbox"
                                            checked={
                                                data.length > 0 &&
                                                select.selectedRowKeys?.length === data.length
                                            }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    const keys = data.map(getRowKey);
                                                    select.onSelectChange?.(keys, data);
                                                } else {
                                                    select.onSelectChange?.([], []);
                                                }
                                            }}
                                            ref={(el) => {
                                                if (el) {
                                                    el.indeterminate =
                                                        select.selectedRowKeys.length > 0 &&
                                                        select.selectedRowKeys.length < data.length;
                                                }
                                            }}
                                        />
                                    </div>
                                </th>
                            )}
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    style={{ width: col.width, textAlign: col.align }}
                                    className={clsx(
                                        "border-y px-md py-md text-left",
                                        "font-medium text-primary-100 bg-primary"
                                    )}
                                    
                                >
                                    <div
                                        className={clsx(
                                            "flex flex-nowrap items-center gap-xs",
                                            col.sorter && "cursor-pointer select-none"
                                        )}
                                        onClick={() => {
                                            if (!col.sorter) return;

                                            let order: "asc" | "desc" | null = "asc";
                                            if (sorter?.field === col.key) {
                                                if (sorter.order === "asc") {
                                                    order = "desc";
                                                } else if (sorter.order === "desc") {
                                                    order = null;
                                                }
                                            }

                                            const newSorter = {
                                                field: order ? col.key : "",
                                                order: order,
                                            };

                                            setSorter(order ? newSorter : undefined);
                                            onSortChange?.(newSorter);
                                        }}
                                    >
                                        {col.sorter && (
                                            col.key === sorter?.field ? (
                                                sorter.order === "asc" ? (
                                                    <HiMiniChevronUp />
                                                ) : (
                                                    <HiMiniChevronDown />
                                                )
                                            ) : (
                                                <HiMiniChevronUpDown/>
                                            )
                                        )}
                                        <span className="whitespace-nowrap">{col.title}</span>
                                    </div>

                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="p-md text-center h-36">
                                    {!loading && (
                                        <>
                                            <HiOutlineDocumentSearch className="w-6 h-6 text-ink/50 mx-auto mb-2" />
                                            <span className="text-ink/50">Không có dữ liệu</span>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => {
                                    const key =
                                        typeof rowKey === "function"
                                            ? rowKey(item)
                                            : (item as any)[rowKey];

                                    return (
                                        <tr key={rowIndex} className="hover:bg-ink-100 px-md py-sm">
                                            {select && (
                                                <td className="border-b px-md py-md ">
                                                    <input
                                                        type="checkbox"
                                                        checked={select.selectedRowKeys?.includes(key)}
                                                        onChange={(e) => {
                                                            let newKeys: React.Key[];

                                                            if (e.target.checked) {
                                                                newKeys = [...select.selectedRowKeys, key];
                                                            } else {
                                                                newKeys = select.selectedRowKeys.filter(k => k !== key);
                                                            }

                                                            const selectedRows = data.filter(d => newKeys.includes(getRowKey(d)));

                                                            select.onSelectChange?.(newKeys, selectedRows);
                                                        }}
                                                    />
                                                </td>
                                            )}
                                            {columns.map((col, index) => (
                                                <td
                                                    key={index}
                                                    style={{ textAlign: col.align }}
                                                    className={clsx(
                                                        "border-b px-md py-sm text-nowrap",
                                                        col.ellipsis && "max-w-[100px]"
                                                    )}
                                                >
                                                    {col.render
                                                        ? col.render(
                                                            col.dataIndex
                                                                ? (item as any)[col.dataIndex]
                                                                : undefined,
                                                            item,
                                                            rowIndex
                                                        )
                                                        : col.dataIndex
                                                        ? <span className="px-md py-sm">{(item as any)[col.dataIndex]}</span>
                                                        : null}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            )}
                    </tbody>
                </table>
            </div>
            {
                loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-ink-100/50"><LoadingSpinner /></div>
                )
            }
            {(select) && (
                <div className="flex flex-col gap-sm">
                    <span>Đã chọn: {select.selectedRowKeys.length}</span>
                    <div
                        className={clsx(
                            "flex items-center gap-sm flex-wrap",
                            select.selectedRowKeys.length === 0 && "opacity-50 pointer-events-none"
                        )}
                    >
                        {select.actions?.map((action, index) => (
                            <div
                                key={index}
                                onClick={() => action.onAction(select.selectedRowKeys, data.filter(d => select.selectedRowKeys.includes(getRowKey(d))))}
                            >
                                {action.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}