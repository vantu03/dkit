import { FaSpinner } from "react-icons/fa";
import clsx from "clsx";

export default function LoadingSpinner(
    {
        
        ...props
    }: React.HTMLAttributes<SVGElement>
) {
    return (
        <div className="flex items-center justify-center">
            <FaSpinner
                {...props}
                className={clsx(
                    "animate-spin ",
                    props.className
                )}
            />
        </div>
    );
}
