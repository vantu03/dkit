import React from "react";
import clsx from "clsx";

type DividerAlign = "left" | "center" | "right";

export interface AppDividerProps {
    label?: React.ReactNode; 
    align?: DividerAlign;
    className?: string;
    lineClassName?: string;
    labelClassName?: string;
}

export default function AppDivider({
    label,
    align = "center",
    className,
    lineClassName,
    labelClassName,
}: AppDividerProps) {
    const isLabeled = Boolean(label);

    return (
        <div
            className={clsx(
                "flex items-center w-full",
                className
            )}
        >
            <div
                className={clsx(
                    "flex-grow border-t",
                    isLabeled && (align === "left" ? "mr-xs" : align === "right" ? "ml-xs" : "mx-xs"),
                    lineClassName
                )}
            />
            {isLabeled && (
                <span
                    className={clsx(
                        "text-sm text-ink",
                        labelClassName
                    )}
                >
                    {label}
                </span>
            )}
            <div
                className={clsx(
                    "flex-grow border-t",
                    isLabeled && (align === "left" ? "ml-xs" : align === "right" ? "mr-xs" : "mx-xs"),
                    lineClassName
                )}
            />
        </div>
    );
}
