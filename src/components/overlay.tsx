import clsx from "clsx";

export default function AppOverlay(
    {
        children,
        ...props
    } : {
        children: React.ReactNode;
    } & React.HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            {...props}
            className={clsx(
                "fixed inset-0",
                "bg-ink/45",
                "z-50",
                "grid place-items-center",
                props.className
            )}
        >
            {children}
        </div>
    );
}