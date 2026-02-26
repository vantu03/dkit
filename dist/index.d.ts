import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1 from 'react';

declare function Button({ children, icon, loading, intent, danger, disabled: disabledProp, ...props }: {
    children: React.ReactNode;
    icon?: React.ReactNode;
    loading?: boolean;
    intent?: "primary" | "secondary" | "text" | "danger" | "success" | "warning";
    danger?: boolean;
    noBackground?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>): react_jsx_runtime.JSX.Element;

declare const useFormDisabled: () => boolean;
type FormValues = Record<string, any>;
declare const useFormInitialValues: () => FormValues;
type FormCallback = {
    onDone?: () => void;
    onLoadingChange?: (loading: boolean) => void;
    initialData?: FormValues;
    disabled?: boolean;
};
declare function Form({ onFinish, onSubmit, disabled, initialValues, ...props }: {
    onFinish?: (formData: FormData, form: HTMLFormElement) => void;
    disabled?: boolean;
    initialValues?: FormValues;
} & React.FormHTMLAttributes<HTMLFormElement>): react_jsx_runtime.JSX.Element;

declare function Input({ label, icon, isShowPassword, disabled: disabledProp, defaultValue: defaultValueProp, numericFormat, ...props }: {
    label?: React.ReactNode;
    icon?: React.ReactNode;
    isShowPassword?: boolean;
    numericFormat?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>): react_jsx_runtime.JSX.Element;

declare function Textarea({ label, disabled: disabledProp, defaultValue: defaultValueProp, ...props }: {
    label?: React.ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>): react_jsx_runtime.JSX.Element;

declare function Select({ options, label, disabled: disabledProp, defaultValue: defaultValueProp, ...props }: {
    label?: React.ReactNode;
    options?: {
        value: any;
        label: string;
    }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>): react_jsx_runtime.JSX.Element;

declare function Checkbox({ label, disabled: disabledProp, defaultValue: defaultValueProp, className, ...props }: {
    label?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">): react_jsx_runtime.JSX.Element;

type DividerAlign = "left" | "center" | "right";
interface AppDividerProps {
    label?: React$1.ReactNode;
    align?: DividerAlign;
    className?: string;
    lineClassName?: string;
    labelClassName?: string;
}
declare function AppDivider({ label, align, className, lineClassName, labelClassName, }: AppDividerProps): react_jsx_runtime.JSX.Element;

declare function LoadingSpinner({ ...props }: React.HTMLAttributes<SVGElement>): react_jsx_runtime.JSX.Element;

declare function AppOverlay({ children, ...props }: {
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;

declare function Info({ children, type, ...props }: {
    type?: "info" | "muted" | "warning" | "success" | "danger";
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;

interface PaginationProps {
    page: number;
    size: number;
    total: number;
    onPageChange: (page: number) => void;
    onSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
    delta?: number;
}
declare function AppPagination({ page, size, total, onPageChange, onSizeChange, pageSizeOptions, delta, }: PaginationProps): react_jsx_runtime.JSX.Element;

interface AppTableColumn<T> {
    key: string;
    dataIndex?: string;
    title: React$1.ReactNode;
    width?: number | string;
    align?: "left" | "center" | "right";
    render?: (data: any, rowData: T, rowIndex: number) => React$1.ReactNode;
    sorter?: boolean;
    ellipsis?: boolean;
}
interface AppTableProps<T> {
    columns: AppTableColumn<T>[];
    data: T[];
    rowKey: string | ((record: T) => string);
    loading?: boolean;
    onSortChange?: (sorter: {
        field: string;
        order: "asc" | "desc" | null;
    }) => void;
    select?: {
        onSelectChange: (keys: React$1.Key[], selectedRows: T[]) => void;
        selectedRowKeys: React$1.Key[];
        actions?: {
            label: React$1.ReactNode;
            onAction: (selectedRowKeys: React$1.Key[], selectedRows: T[]) => void;
        }[];
    };
}
declare function AppTable<T>({ columns, data, rowKey, loading, onSortChange, select, }: AppTableProps<T>): react_jsx_runtime.JSX.Element;

declare function Tag({ children, type, ...props }: {
    type?: "info" | "muted" | "warning" | "success" | "danger";
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>): react_jsx_runtime.JSX.Element;

declare function Card({ title, description, actions, children, ...props }: {
    title?: React$1.ReactNode;
    children: React$1.ReactNode;
    description?: React$1.ReactNode;
    actions?: React$1.ReactNode;
} & Omit<React$1.HTMLAttributes<HTMLDivElement>, "title">): react_jsx_runtime.JSX.Element;

export { Button, Card, Checkbox, AppDivider as Divider, Form, type FormCallback, type FormValues, Info, LoadingSpinner, AppOverlay as Overlay, AppPagination as Pagination, Select, AppTable as Table, Tag, Textarea as TextArea, Input as TextInput, useFormDisabled, useFormInitialValues };
