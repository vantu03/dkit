import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

interface TabItem {
    key: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
}

export default function Tabs({
    items,
    defaultKey = "",
    onChange,
}: {
    items: (TabItem | null | boolean)[];
    defaultKey?: string;
    onChange?: (key: string) => void;
}) {


    const itemsFilter = items.filter(d => d != null && typeof d === "object" && "key" in d) as TabItem[];

    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get("tab");

    const [currentKey, setCurrentKey] = useState(
        tabFromUrl ||
        defaultKey ||
        itemsFilter.find(i => i)?.key
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && tab !== currentKey) {
            setCurrentKey(tab);
        }
    }, [searchParams]);

    const activeTab = itemsFilter.find(i => i.key === currentKey);
return (
    <div className="flex flex-col gap-md">
        {/* Tabs bar */}
        <div
            ref={containerRef}
            className={clsx(
                "relative",
                "w-full overflow-x-auto overflow-y-hidden",
                "border-b border-ink-300"
            )}
        >
            <div className="flex gap-sm min-w-max px-xs">
                {itemsFilter.map((item) => {
                    if (!item) return null;
                    const active = item.key === currentKey;

                    return (
                        <button
                            key={item.key}
                            ref={(el) => {
                                tabRefs.current[item.key] = el;
                            }}
                            onClick={() => {
                                setCurrentKey(item.key);
                                setSearchParams({ tab: item.key }, { replace: true });
                                onChange?.(item.key);
                            }}
                            className={clsx(
                                "relative",
                                "px-md py-sm",
                                "flex items-center gap-sm",
                                "rounded-t-md",
                                active
                                    ? "text-primary bg-ink-50"
                                    : "text-ink/70 hover:text-ink hover:bg-ink-100"
                            )}
                        >
                            {item.icon && (
                                <span className="w-[16px] h-[16px] flex items-center">
                                    {item.icon}
                                </span>
                            )}
                            <span className="text-nowrap">{item.label}</span>

                            {active && (
                                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>

        <div className="p-md bg-ink-0 rounded-md border border-ink-300">
            {activeTab?.content}
        </div>
    </div>
);
}
