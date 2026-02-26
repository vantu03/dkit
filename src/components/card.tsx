
import clsx from "clsx";
import type React from "react";

export default function Card({
    title,
    description,
    actions,
    children,
    ...props
}: {
    title?: React.ReactNode;
    children: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}  & Omit<React.HTMLAttributes<HTMLDivElement>, "title">) {
    return (
        <div
            {...props}
            className={clsx(
                "bg-ink-0 border-[1px] border-ink-200",
                "rounded-xl",
                props.className
            )}
        >
            {(title || actions) && (
                <header
                    className={clsx(
                        "px-lg py-md",
                        "border-b border-ink-200",
                        "flex items-center justify-between",
                        "gap-md"
                    )}
                >
                    <div className="flex-1">
                        {title && (
                            <div className="font-medium">
                                {title}
                            </div>
                        )}

                        {description && (
                            <p className="text-secondary mt-xs">
                                {description}
                            </p>
                        )}
                    </div>

                    {actions && (
                        <div className="flex items-center gap-sm">
                            {actions}
                        </div>
                    )}
                </header>
            )}

            <div className="px-lg py-lg">
                {children}
            </div>
        </div>
    );
}
