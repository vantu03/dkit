import clsx from "clsx";
import LoadingSpinner from "../loading-spinner";
import { useFormDisabled } from "./form";

export default function Button({
    children,
    icon,
    loading,
    intent,
    danger,
    disabled: disabledProp,
    ...props
}: {
    children: React.ReactNode;
    icon?: React.ReactNode;
    loading?: boolean;
    intent?: "primary" | "secondary" | "text" | "danger" | "success" | "warning";
    danger?: boolean;
    noBackground?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    if (intent === undefined && !danger) {
        intent = "primary";
    }

    const disabled = disabledProp ?? useFormDisabled();
    
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={clsx(
                "px-md py-sm rounded-md font-medium transition flex items-center justify-center gap-sm text-nowrap",

                danger && "text-danger hover:bg-danger-200 bg-transparent",
                intent === "primary" && "bg-primary text-primary-50",
                intent === "secondary" && "bg-secondary text-secondary-50",
                intent === "text" && "bg-transparent text-primary",
                intent === "danger" && "bg-danger text-danger-50",
                intent === "success" && "bg-success text-success-50",
                intent === "warning" && "bg-warning text-warning-50",

                !(disabled || loading) && [
                    intent === "primary" && "hover:bg-primary-600",
                    intent === "secondary" && "hover:bg-secondary-600",
                    intent === "text" && "hover:bg-primary-100",
                    intent === "danger" && "hover:bg-danger-600",
                    intent === "success" && "hover:bg-success-600",
                    intent === "warning" && "hover:bg-warning-600",
                ],

                loading && "opacity-70 cursor-not-allowed",

                disabled && "opacity-50 cursor-not-allowed",

                props.className
            )}
        >
            {loading ? (
                <LoadingSpinner />
            ) : icon && <span>{icon}</span>}
            {children}
        </button>
    );
}