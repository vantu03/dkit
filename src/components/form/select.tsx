import clsx from "clsx";
import { useFormDisabled, useFormInitialValues } from "./form";

export default function Select({
    options,
    label,
    disabled: disabledProp,
    defaultValue: defaultValueProp,
    ...props
} : {
    label?: React.ReactNode;
    options?: {
        value: any;
        label: string;
    }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {

    const disabled = disabledProp ?? useFormDisabled();
    const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? "";
    return (
        <label
            className={clsx(
                "flex flex-col gap-xs text-nowrap",
                props.className
            )}
        >
            {label && <span className="text-sm">{label}</span>}
            <div
                className={clsx(
                    "bg-ink-0 border border-ink-600 rounded-md px-sm py-sm",
                    "focus-within:ring-2 focus-within:ring-ink-200 focus-within:ring-offset-1",
                    "hover:bg-ink-100",
                    disabled && "cursor-not-allowed bg-ink-200",
                    props.className
                )}
            >
                <select
                    {...props}
                    disabled={disabled}
                    className={clsx(
                        "w-full h-full",
                        "outline-none bg-transparent ",
                        disabled && "cursor-not-allowed bg-ink-200"
                    )}
                    defaultValue={defaultValue}
                >
                    {options?.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </label>
    );
}