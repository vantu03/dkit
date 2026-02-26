// src/components/form/button.tsx
import clsx2 from "clsx";

// src/components/loading-spinner.tsx
import { FaSpinner } from "react-icons/fa";
import clsx from "clsx";
import { jsx } from "react/jsx-runtime";
function LoadingSpinner({
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
    FaSpinner,
    {
      ...props,
      className: clsx(
        "animate-spin ",
        props.className
      )
    }
  ) });
}

// src/components/form/form.tsx
import { createContext, useContext } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var FormDisabledContext = createContext(false);
var useFormDisabled = () => useContext(FormDisabledContext);
var FormInitialValuesContext = createContext({});
var useFormInitialValues = () => useContext(FormInitialValuesContext);
function Form({
  onFinish,
  onSubmit,
  disabled = false,
  initialValues,
  ...props
}) {
  return /* @__PURE__ */ jsx2(FormDisabledContext.Provider, { value: disabled, children: /* @__PURE__ */ jsx2(FormInitialValuesContext.Provider, { value: initialValues ?? {}, children: /* @__PURE__ */ jsx2(
    "form",
    {
      ...props,
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit?.(e);
        if (!onFinish) return;
        const formData = new FormData(e.currentTarget);
        onFinish(formData, e.currentTarget);
      }
    }
  ) }) });
}

// src/components/form/button.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function Button({
  children,
  icon,
  loading,
  intent,
  danger,
  disabled: disabledProp,
  ...props
}) {
  if (intent === void 0 && !danger) {
    intent = "primary";
  }
  const disabled = disabledProp ?? useFormDisabled();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ...props,
      disabled: disabled || loading,
      className: clsx2(
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
          intent === "warning" && "hover:bg-warning-600"
        ],
        loading && "opacity-70 cursor-not-allowed",
        disabled && "opacity-50 cursor-not-allowed",
        props.className
      ),
      children: [
        loading ? /* @__PURE__ */ jsx3(LoadingSpinner, {}) : icon && /* @__PURE__ */ jsx3("span", { children: icon }),
        children
      ]
    }
  );
}

// src/components/form/input.tsx
import clsx3 from "clsx";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function Input({
  label,
  icon,
  isShowPassword = true,
  disabled: disabledProp,
  defaultValue: defaultValueProp,
  numericFormat,
  ...props
}) {
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
  return /* @__PURE__ */ jsxs2("label", { className: clsx3(
    "flex flex-col gap-xs text-nowrap",
    props.className
  ), children: [
    label && /* @__PURE__ */ jsx4("span", { className: "text-sm", children: label }),
    /* @__PURE__ */ jsxs2(
      "div",
      {
        className: clsx3(
          "text-base bg-ink-0 border border-ink-600 rounded-md px-sm py-sm",
          // "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          disabled && "cursor-not-allowed bg-ink-200",
          "flex items-center gap-sm"
        ),
        children: [
          icon && /* @__PURE__ */ jsx4("span", { children: icon }),
          /* @__PURE__ */ jsx4(
            "input",
            {
              ...props,
              type: resolvedType,
              className: clsx3(
                "w-full outline-none bg-transparent",
                disabled && "cursor-not-allowed bg-ink-200"
              ),
              disabled,
              defaultValue: props.value !== void 0 ? void 0 : defaultValue
            }
          ),
          isShowPassword && props.type === "password" && /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              onClick: toggleShowPassword,
              className: clsx3(
                "font-medium",
                disabled && "cursor-not-allowed"
              ),
              disabled,
              children: type === "password" ? /* @__PURE__ */ jsx4(FaEye, {}) : /* @__PURE__ */ jsx4(FaEyeSlash, {})
            }
          )
        ]
      }
    )
  ] });
}

// src/components/form/textarea.tsx
import clsx4 from "clsx";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function Textarea({
  label,
  disabled: disabledProp,
  defaultValue: defaultValueProp,
  ...props
}) {
  const disabled = disabledProp ?? useFormDisabled();
  const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? "";
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: clsx4(
        "flex flex-col gap-xs",
        props.className
      ),
      children: [
        label && /* @__PURE__ */ jsx5("label", { className: "text-sm font-medium text-nowrap", children: label }),
        /* @__PURE__ */ jsx5(
          "textarea",
          {
            ...props,
            disabled,
            className: clsx4(
              "bg-ink-0 border border-ink-600 rounded-md px-sm py-sm resize-y min-h-[80px]",
              // "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              disabled && "cursor-not-allowed bg-ink-200"
            ),
            defaultValue
          }
        )
      ]
    }
  );
}

// src/components/form/select.tsx
import clsx5 from "clsx";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function Select({
  options,
  label,
  disabled: disabledProp,
  defaultValue: defaultValueProp,
  ...props
}) {
  const disabled = disabledProp ?? useFormDisabled();
  const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? "";
  return /* @__PURE__ */ jsxs4(
    "label",
    {
      className: clsx5(
        "flex flex-col gap-xs text-nowrap",
        props.className
      ),
      children: [
        label && /* @__PURE__ */ jsx6("span", { className: "text-sm", children: label }),
        /* @__PURE__ */ jsx6(
          "div",
          {
            className: clsx5(
              "bg-ink-0 border border-ink-600 rounded-md px-sm py-sm",
              "focus-within:ring-2 focus-within:ring-ink-200 focus-within:ring-offset-1",
              "hover:bg-ink-100",
              disabled && "cursor-not-allowed bg-ink-200",
              props.className
            ),
            children: /* @__PURE__ */ jsx6(
              "select",
              {
                ...props,
                disabled,
                className: clsx5(
                  "w-full h-full",
                  "outline-none bg-transparent ",
                  disabled && "cursor-not-allowed bg-ink-200"
                ),
                defaultValue,
                children: options?.map((option, index) => /* @__PURE__ */ jsx6("option", { value: option.value, children: option.label }, index))
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/form/checkbox.tsx
import clsx6 from "clsx";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
function Checkbox({
  label,
  disabled: disabledProp,
  defaultValue: defaultValueProp,
  className,
  ...props
}) {
  const disabled = disabledProp ?? useFormDisabled();
  const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? false;
  return /* @__PURE__ */ jsxs5(
    "label",
    {
      className: clsx6(
        "flex items-center gap-sm select-none",
        disabled && "cursor-not-allowed opacity-80",
        className
      ),
      children: [
        /* @__PURE__ */ jsx7(
          "input",
          {
            ...props,
            type: "checkbox",
            disabled,
            className: clsx6(
              "h-5 w-5 rounded border border-ink-600 bg-ink-0",
              "accent-primary",
              disabled && "cursor-not-allowed bg-ink-200"
            ),
            defaultChecked: defaultValue
          }
        ),
        label && /* @__PURE__ */ jsx7("span", { children: label })
      ]
    }
  );
}

// src/components/form/divider.tsx
import clsx7 from "clsx";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
function AppDivider({
  label,
  align = "center",
  className,
  lineClassName,
  labelClassName
}) {
  const isLabeled = Boolean(label);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: clsx7(
        "flex items-center w-full",
        className
      ),
      children: [
        /* @__PURE__ */ jsx8(
          "div",
          {
            className: clsx7(
              "flex-grow border-t",
              isLabeled && (align === "left" ? "mr-xs" : align === "right" ? "ml-xs" : "mx-xs"),
              lineClassName
            )
          }
        ),
        isLabeled && /* @__PURE__ */ jsx8(
          "span",
          {
            className: clsx7(
              "text-sm text-ink",
              labelClassName
            ),
            children: label
          }
        ),
        /* @__PURE__ */ jsx8(
          "div",
          {
            className: clsx7(
              "flex-grow border-t",
              isLabeled && (align === "left" ? "ml-xs" : align === "right" ? "mr-xs" : "mx-xs"),
              lineClassName
            )
          }
        )
      ]
    }
  );
}

// src/components/overlay.tsx
import clsx8 from "clsx";
import { jsx as jsx9 } from "react/jsx-runtime";
function AppOverlay({
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      ...props,
      className: clsx8(
        "fixed inset-0",
        "bg-ink/45",
        "z-50",
        "grid place-items-center",
        props.className
      ),
      children
    }
  );
}

// src/components/info.tsx
import clsx9 from "clsx";
import { jsx as jsx10 } from "react/jsx-runtime";
function Info({
  children,
  type = "info",
  ...props
}) {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      ...props,
      className: clsx9(
        type === "info" && "rounded-md bg-primary/20 p-md text-primary",
        type === "muted" && "rounded-md bg-ink-600/20 p-md text-ink/50",
        type === "warning" && "rounded-md bg-warning/20 p-md text-warning",
        type === "success" && "rounded-md bg-success/20 p-md text-success",
        type === "danger" && "rounded-md bg-danger/20 p-md text-danger",
        props.className
      ),
      children
    }
  );
}

// src/components/pagination.tsx
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx10 from "clsx";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
function AppPagination({
  page,
  size,
  total,
  onPageChange,
  onSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  delta = 2
}) {
  const totalPages = Math.ceil(total / size);
  const current = page + 1;
  const left = Math.max(1, current - delta);
  const right = Math.min(totalPages, current + delta);
  return /* @__PURE__ */ jsxs7("div", { className: clsx10(
    "flex flex-col md:flex-row md:items-center md:justify-between",
    "px-sm py-sm",
    "text-ink"
  ), children: [
    /* @__PURE__ */ jsxs7("span", { children: [
      "Trang ",
      current,
      " / ",
      totalPages
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "flex flex-col xs:flex-row xs:items-center gap-xs", children: [
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-xs", children: [
        /* @__PURE__ */ jsxs7(
          "button",
          {
            disabled: page === 0,
            onClick: () => onPageChange(page - 1),
            className: clsx10(
              "px-sm py-xs rounded-md flex items-center gap-xs font-medium",
              page === 0 ? "text-ink/50" : "text-secondary hover:bg-secondary/20"
            ),
            children: [
              /* @__PURE__ */ jsx11(FiChevronLeft, {}),
              /* @__PURE__ */ jsx11("span", { className: "hidden sm:inline", children: "Tr\u01B0\u1EDBc" })
            ]
          }
        ),
        /* @__PURE__ */ jsx11("div", { children: Array.from({ length: right - left + 1 }, (_, i) => left + i).map(((p) => /* @__PURE__ */ jsx11(
          "button",
          {
            onClick: () => onPageChange(p - 1),
            className: clsx10(
              "px-sm py-xs rounded-md font-medium text-secondary",
              p === current ? "bg-secondary/20" : "hover:bg-secondary/10"
            ),
            children: p
          },
          p
        ))) }),
        /* @__PURE__ */ jsxs7(
          "button",
          {
            disabled: current >= totalPages,
            onClick: () => onPageChange(page + 1),
            className: clsx10(
              "px-sm py-xs rounded-md flex items-center gap-xs font-medium",
              current >= totalPages ? "text-ink/70" : "text-secondary hover:bg-secondary/20"
            ),
            children: [
              /* @__PURE__ */ jsx11("span", { className: "hidden sm:inline", children: "Sau" }),
              /* @__PURE__ */ jsx11(FiChevronRight, {})
            ]
          }
        )
      ] }),
      onSizeChange && /* @__PURE__ */ jsx11(
        "select",
        {
          value: size,
          onChange: (e) => onSizeChange(Number(e.target.value)),
          className: clsx10(
            "ml-sm border rounded-md px-xs py-xs bg-transparent text-ink",
            "focus:outline-none focus:ring-2 focus:ring-ink-200 focus:ring-offset-1",
            "hover:bg-ink-100"
          ),
          children: pageSizeOptions.map((v) => /* @__PURE__ */ jsxs7("option", { value: v, children: [
            v,
            " / Trang"
          ] }, v))
        }
      )
    ] })
  ] });
}

// src/components/table.tsx
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniChevronUpDown } from "react-icons/hi2";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useState as useState2 } from "react";
import clsx11 from "clsx";
import { Fragment, jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
function AppTable({
  columns,
  data,
  rowKey,
  loading,
  onSortChange,
  select
}) {
  const [sorter, setSorter] = useState2();
  const getRowKey = (record) => typeof rowKey === "function" ? rowKey(record) : record[rowKey];
  return /* @__PURE__ */ jsxs8("div", { className: "w-full bg-ink-0 relative flex flex-col gap-md", children: [
    /* @__PURE__ */ jsx12("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxs8("table", { className: "min-w-full border-collapse", children: [
      /* @__PURE__ */ jsx12("thead", { children: /* @__PURE__ */ jsxs8("tr", { children: [
        select && /* @__PURE__ */ jsx12("th", { className: clsx11(
          "border-y px-md py-md text-left",
          "font-medium text-primary-100 hover:text-ink bg-primary"
        ), children: /* @__PURE__ */ jsx12("div", { className: "flex items-center gap-xs", children: /* @__PURE__ */ jsx12(
          "input",
          {
            type: "checkbox",
            checked: data.length > 0 && select.selectedRowKeys?.length === data.length,
            onChange: (e) => {
              if (e.target.checked) {
                const keys = data.map(getRowKey);
                select.onSelectChange?.(keys, data);
              } else {
                select.onSelectChange?.([], []);
              }
            },
            ref: (el) => {
              if (el) {
                el.indeterminate = select.selectedRowKeys.length > 0 && select.selectedRowKeys.length < data.length;
              }
            }
          }
        ) }) }),
        columns.map((col, index) => /* @__PURE__ */ jsx12(
          "th",
          {
            style: { width: col.width, textAlign: col.align },
            className: clsx11(
              "border-y px-md py-md text-left",
              "font-medium text-primary-100 bg-primary"
            ),
            children: /* @__PURE__ */ jsxs8(
              "div",
              {
                className: clsx11(
                  "flex flex-nowrap items-center gap-xs",
                  col.sorter && "cursor-pointer select-none"
                ),
                onClick: () => {
                  if (!col.sorter) return;
                  let order = "asc";
                  if (sorter?.field === col.key) {
                    if (sorter.order === "asc") {
                      order = "desc";
                    } else if (sorter.order === "desc") {
                      order = null;
                    }
                  }
                  const newSorter = {
                    field: order ? col.key : "",
                    order
                  };
                  setSorter(order ? newSorter : void 0);
                  onSortChange?.(newSorter);
                },
                children: [
                  col.sorter && (col.key === sorter?.field ? sorter.order === "asc" ? /* @__PURE__ */ jsx12(HiMiniChevronUp, {}) : /* @__PURE__ */ jsx12(HiMiniChevronDown, {}) : /* @__PURE__ */ jsx12(HiMiniChevronUpDown, {})),
                  /* @__PURE__ */ jsx12("span", { className: "whitespace-nowrap", children: col.title })
                ]
              }
            )
          },
          index
        ))
      ] }) }),
      /* @__PURE__ */ jsx12("tbody", { className: "", children: data.length === 0 ? /* @__PURE__ */ jsx12("tr", { children: /* @__PURE__ */ jsx12("td", { colSpan: columns.length, className: "p-md text-center h-36", children: !loading && /* @__PURE__ */ jsxs8(Fragment, { children: [
        /* @__PURE__ */ jsx12(HiOutlineDocumentSearch, { className: "w-6 h-6 text-ink/50 mx-auto mb-2" }),
        /* @__PURE__ */ jsx12("span", { className: "text-ink/50", children: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u" })
      ] }) }) }) : data.map((item, rowIndex) => {
        const key = typeof rowKey === "function" ? rowKey(item) : item[rowKey];
        return /* @__PURE__ */ jsxs8("tr", { className: "hover:bg-ink-100 px-md py-sm", children: [
          select && /* @__PURE__ */ jsx12("td", { className: "border-b px-md py-md ", children: /* @__PURE__ */ jsx12(
            "input",
            {
              type: "checkbox",
              checked: select.selectedRowKeys?.includes(key),
              onChange: (e) => {
                let newKeys;
                if (e.target.checked) {
                  newKeys = [...select.selectedRowKeys, key];
                } else {
                  newKeys = select.selectedRowKeys.filter((k) => k !== key);
                }
                const selectedRows = data.filter((d) => newKeys.includes(getRowKey(d)));
                select.onSelectChange?.(newKeys, selectedRows);
              }
            }
          ) }),
          columns.map((col, index) => /* @__PURE__ */ jsx12(
            "td",
            {
              style: { textAlign: col.align },
              className: clsx11(
                "border-b px-md py-sm text-nowrap",
                col.ellipsis && "max-w-[100px]"
              ),
              children: col.render ? col.render(
                col.dataIndex ? item[col.dataIndex] : void 0,
                item,
                rowIndex
              ) : col.dataIndex ? /* @__PURE__ */ jsx12("span", { className: "px-md py-sm", children: item[col.dataIndex] }) : null
            },
            index
          ))
        ] }, rowIndex);
      }) })
    ] }) }),
    loading && /* @__PURE__ */ jsx12("div", { className: "absolute inset-0 flex items-center justify-center bg-ink-100/50", children: /* @__PURE__ */ jsx12(LoadingSpinner, {}) }),
    select && /* @__PURE__ */ jsxs8("div", { className: "flex flex-col gap-sm", children: [
      /* @__PURE__ */ jsxs8("span", { children: [
        "\u0110\xE3 ch\u1ECDn: ",
        select.selectedRowKeys.length
      ] }),
      /* @__PURE__ */ jsx12(
        "div",
        {
          className: clsx11(
            "flex items-center gap-sm flex-wrap",
            select.selectedRowKeys.length === 0 && "opacity-50 pointer-events-none"
          ),
          children: select.actions?.map((action, index) => /* @__PURE__ */ jsx12(
            "div",
            {
              onClick: () => action.onAction(select.selectedRowKeys, data.filter((d) => select.selectedRowKeys.includes(getRowKey(d)))),
              children: action.label
            },
            index
          ))
        }
      )
    ] })
  ] });
}

// src/components/tag.tsx
import clsx12 from "clsx";
import { jsx as jsx13 } from "react/jsx-runtime";
function Tag({
  children,
  type = "info",
  ...props
}) {
  return /* @__PURE__ */ jsx13(
    "span",
    {
      ...props,
      className: clsx12(
        "inline-flex items-center rounded-full px-sm py-xs text-sm font-medium",
        type === "info" && "bg-primary/20 text-primary",
        type === "muted" && "bg-ink/20 text-ink",
        type === "warning" && "bg-warning/20 text-warning",
        type === "success" && "bg-success/20 text-success",
        type === "danger" && "bg-danger/20 text-danger",
        props.className
      ),
      children
    }
  );
}

// src/components/card.tsx
import clsx13 from "clsx";
import { jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
function Card({
  title,
  description,
  actions,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs9(
    "div",
    {
      ...props,
      className: clsx13(
        "bg-ink-0 border-[1px] border-ink-200",
        "rounded-xl",
        props.className
      ),
      children: [
        (title || actions) && /* @__PURE__ */ jsxs9(
          "header",
          {
            className: clsx13(
              "px-lg py-md",
              "border-b border-ink-200",
              "flex items-center justify-between",
              "gap-md"
            ),
            children: [
              /* @__PURE__ */ jsxs9("div", { className: "flex-1", children: [
                title && /* @__PURE__ */ jsx14("div", { className: "font-medium", children: title }),
                description && /* @__PURE__ */ jsx14("p", { className: "text-secondary mt-xs", children: description })
              ] }),
              actions && /* @__PURE__ */ jsx14("div", { className: "flex items-center gap-sm", children: actions })
            ]
          }
        ),
        /* @__PURE__ */ jsx14("div", { className: "px-lg py-lg", children })
      ]
    }
  );
}
export {
  Button,
  Card,
  Checkbox,
  AppDivider as Divider,
  Form,
  Info,
  LoadingSpinner,
  AppOverlay as Overlay,
  AppPagination as Pagination,
  Select,
  AppTable as Table,
  Tag,
  Textarea as TextArea,
  Input as TextInput,
  useFormDisabled,
  useFormInitialValues
};
