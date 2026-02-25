import clsx from "clsx";
import { useFormDisabled, useFormInitialValues } from "./form";

export default function Checkbox({
    label,
    disabled: disabledProp,
    defaultValue: defaultValueProp,
    className,
    ...props
}: {
    label?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
    const disabled = disabledProp ?? useFormDisabled();
    const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? false;

    return (
        <label
            className={clsx(
                "flex items-center gap-sm select-none",
                disabled && "cursor-not-allowed opacity-80",
                className
            )}
        >
            <input
                {...props}
                type="checkbox"
                disabled={disabled}
                className={clsx(
                    "h-5 w-5 rounded border border-ink-600 bg-ink-0",
                    "accent-primary",
                    disabled && "cursor-not-allowed bg-ink-200"
                )}
                defaultChecked={defaultValue}
            />
            {label && <span>{label}</span>}
        </label>
    );
}
