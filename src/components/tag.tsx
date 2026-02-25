import clsx from "clsx";

export default function Tag(
    {
        children,
        type = "info",
        ...props
    }: {
        type?: "info" | "muted" | "warning" | "success" | "danger";
        children: React.ReactNode;
    } & React.HTMLAttributes<HTMLSpanElement>
) {
    return (
        <span
            {...props}
            className={clsx(
                "inline-flex items-center rounded-full px-sm py-xs text-sm font-medium",
                type === "info" && "bg-primary/20 text-primary",
                type === "muted" && "bg-ink/20 text-ink",
                type === "warning" && "bg-warning/20 text-warning",
                type === "success" && "bg-success/20 text-success",
                type === "danger" && "bg-danger/20 text-danger",
                props.className
            )}
        >
            {children}
        </span>
    );
}
