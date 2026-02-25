import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";

export interface PaginationProps {
    page: number;
    size: number;
    total: number;
    onPageChange: (page: number) => void;
    onSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
    delta?: number;
}


export default function AppPagination({
    page,
    size,
    total,
    onPageChange,
    onSizeChange,
    pageSizeOptions = [10, 20, 50, 100],
    delta = 2,
}: PaginationProps) {
    const totalPages = Math.ceil(total / size);
    const current = page + 1;

    // if (totalPages <= 1) return null;
    const left = Math.max(1, current - delta);
    const right = Math.min(totalPages, current + delta);

    return (
        <div className={clsx(
            "flex flex-col md:flex-row md:items-center md:justify-between",
            "px-sm py-sm",
            "text-ink"
        )}>
            <span>
                Trang {current} / {totalPages}
            </span>

            <div className="flex flex-col xs:flex-row xs:items-center gap-xs">
                <div className="flex items-center gap-xs">
                    <button
                        disabled={page === 0}
                        onClick={() => onPageChange(page - 1)}
                        className={clsx(
                            "px-sm py-xs rounded-md flex items-center gap-xs font-medium",
                            page === 0 ? "text-ink/50" : "text-secondary hover:bg-secondary/20"
                        )}
                    >
                        <FiChevronLeft />
                        <span className="hidden sm:inline">Trước</span>
                    </button>
                    <div>

                        {Array.from({ length: right - left + 1 }, (_, i) => left + i).map((p => (
                            <button
                                key={p}
                                onClick={() => onPageChange(p - 1)}
                                className={clsx(
                                    "px-sm py-xs rounded-md font-medium text-secondary",
                                    p === current ? "bg-secondary/20" : "hover:bg-secondary/10"
                                )}
                            >
                                {p}
                            </button>
                        )))}
                    </div>
                    <button
                        disabled={current >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                        className={clsx(
                            "px-sm py-xs rounded-md flex items-center gap-xs font-medium",
                            current >= totalPages ? "text-ink/70" : "text-secondary hover:bg-secondary/20"
                        )}
                    >
                        <span className="hidden sm:inline">Sau</span>
                        <FiChevronRight />
                    </button>
                </div>

                {onSizeChange && (
                    <select
                        value={size}
                        onChange={(e) => onSizeChange(Number(e.target.value))}
                        className={clsx(
                            "ml-sm border rounded-md px-xs py-xs bg-transparent text-ink",
                            "focus:outline-none focus:ring-2 focus:ring-ink-200 focus:ring-offset-1",
                            "hover:bg-ink-100"
                        )}
                    >
                        {pageSizeOptions.map(v => (
                            <option key={v} value={v}>{v} / Trang</option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
}
