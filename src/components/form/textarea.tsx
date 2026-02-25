import clsx from "clsx";
import { useFormDisabled, useFormInitialValues } from "./form";

export default function Textarea({
    label,
    disabled: disabledProp,
    defaultValue: defaultValueProp,
    ...props
}: {
    label?: React.ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {

    const disabled = disabledProp ?? useFormDisabled();
    const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? "";

    return (
        <div
            className={clsx(
                "flex flex-col gap-xs",
                props.className
            )}
        >
            {label && <label className="text-sm font-medium text-nowrap">{label}</label>}
            <textarea
                {...props}
                disabled={disabled}
                className={clsx(
                    "bg-ink-0 border border-ink-600 rounded-md px-sm py-sm resize-y min-h-[80px]",
                    // "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                    disabled && "cursor-not-allowed bg-ink-200"
                )}
                defaultValue={defaultValue}
            />
        </div>
    );
}