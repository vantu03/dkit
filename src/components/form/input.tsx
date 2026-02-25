import clsx from "clsx";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormDisabled, useFormInitialValues } from "./form";

export default function Input({
    label,
    icon,
    isShowPassword = true,
    disabled: disabledProp,
    defaultValue: defaultValueProp,
    numericFormat,
    ...props
} : {
    label?: React.ReactNode,
    icon?: React.ReactNode,
    isShowPassword?: boolean,
    numericFormat?: boolean,
} & React.InputHTMLAttributes<HTMLInputElement>) {

    const disabled = disabledProp ?? useFormDisabled();
    const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? "";
    
    const [type, setType] = useState(props.type || "text");

    const toggleShowPassword = () => {
        if (type === "password") {
            setType("text");
        } else {
            setType(props.type || "text");
        }
    };

    const resolvedType = numericFormat ? "text" : type;

    return (
        <label className={clsx(
            "flex flex-col gap-xs text-nowrap",
            props.className
        )}>
            {label && <span className="text-sm">{label}</span>}
            <div
                className={clsx(
                    "text-base bg-ink-0 border border-ink-600 rounded-md px-sm py-sm",
                    // "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                    disabled && "cursor-not-allowed bg-ink-200",
                    "flex items-center gap-sm"
                )}
            >
                {icon && <span>{icon}</span>}
                <input 
                    {...props}
                    type={resolvedType}
                    className={clsx(
                        "w-full outline-none bg-transparent",
                        disabled && "cursor-not-allowed bg-ink-200"
                    )}
                    disabled={disabled}
                    defaultValue={props.value !== undefined ? undefined : defaultValue}
                />
                {isShowPassword && props.type === "password" && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className={clsx(
                            "font-medium",
                            disabled && "cursor-not-allowed"
                        )}
                        disabled={disabled}
                    >
                        {type === "password" ? <FaEye /> : <FaEyeSlash />}
                    </button>
                )}
            </div>
        </label>
    );
}