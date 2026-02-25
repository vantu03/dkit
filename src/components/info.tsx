import clsx from "clsx";

export default function Info(
    {
        children,
        type = "info",
        ...props
    } : {
        type?: "info" | "muted" | "warning" | "success" | "danger";
        children: React.ReactNode;
    } & React.HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={clsx(
                type === "info" && "rounded-md bg-primary/20 p-md text-primary",
                type === "muted" && "rounded-md bg-ink-600/20 p-md text-ink/50",
                type === "warning" && "rounded-md bg-warning/20 p-md text-warning",
                type === "success" && "rounded-md bg-success/20 p-md text-success",
                type === "danger" && "rounded-md bg-danger/20 p-md text-danger",
                props.className
            )}
        >
            {children}
        </div>
    );
}