"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Card: () => Card,
  Checkbox: () => Checkbox,
  Divider: () => AppDivider,
  Form: () => Form,
  Info: () => Info,
  LoadingSpinner: () => LoadingSpinner,
  Overlay: () => AppOverlay,
  Pagination: () => AppPagination,
  Select: () => Select,
  Table: () => AppTable,
  Tag: () => Tag,
  TextArea: () => Textarea,
  TextInput: () => Input,
  useFormDisabled: () => useFormDisabled,
  useFormInitialValues: () => useFormInitialValues
});
module.exports = __toCommonJS(index_exports);

// src/components/form/button.tsx
var import_clsx2 = __toESM(require("clsx"));

// src/components/loading-spinner.tsx
var import_fa = require("react-icons/fa");
var import_clsx = __toESM(require("clsx"));
var import_jsx_runtime = require("react/jsx-runtime");
function LoadingSpinner({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_fa.FaSpinner,
    {
      ...props,
      className: (0, import_clsx.default)(
        "animate-spin ",
        props.className
      )
    }
  ) });
}

// src/components/form/form.tsx
var import_react = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var FormDisabledContext = (0, import_react.createContext)(false);
var useFormDisabled = () => (0, import_react.useContext)(FormDisabledContext);
var FormInitialValuesContext = (0, import_react.createContext)({});
var useFormInitialValues = () => (0, import_react.useContext)(FormInitialValuesContext);
function Form({
  onFinish,
  onSubmit,
  disabled = false,
  initialValues,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FormDisabledContext.Provider, { value: disabled, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FormInitialValuesContext.Provider, { value: initialValues ?? {}, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "button",
    {
      ...props,
      disabled: disabled || loading,
      className: (0, import_clsx2.default)(
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
        loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(LoadingSpinner, {}) : icon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: icon }),
        children
      ]
    }
  );
}

// src/components/form/input.tsx
var import_clsx3 = __toESM(require("clsx"));
var import_react2 = require("react");
var import_fa2 = require("react-icons/fa");
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  const [type, setType] = (0, import_react2.useState)(props.type || "text");
  const toggleShowPassword = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType(props.type || "text");
    }
  };
  const resolvedType = numericFormat ? "text" : type;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { className: (0, import_clsx3.default)(
    "flex flex-col gap-xs text-nowrap",
    props.className
  ), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: (0, import_clsx3.default)(
          "text-base bg-ink-0 border border-ink-600 rounded-md px-sm py-sm",
          // "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          disabled && "cursor-not-allowed bg-ink-200",
          "flex items-center gap-sm"
        ),
        children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "input",
            {
              ...props,
              type: resolvedType,
              className: (0, import_clsx3.default)(
                "w-full outline-none bg-transparent",
                disabled && "cursor-not-allowed bg-ink-200"
              ),
              disabled,
              defaultValue: props.value !== void 0 ? void 0 : defaultValue
            }
          ),
          isShowPassword && props.type === "password" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              onClick: toggleShowPassword,
              className: (0, import_clsx3.default)(
                "font-medium",
                disabled && "cursor-not-allowed"
              ),
              disabled,
              children: type === "password" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa2.FaEye, {}) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_fa2.FaEyeSlash, {})
            }
          )
        ]
      }
    )
  ] });
}

// src/components/form/textarea.tsx
var import_clsx4 = __toESM(require("clsx"));
var import_jsx_runtime5 = require("react/jsx-runtime");
function Textarea({
  label,
  disabled: disabledProp,
  defaultValue: defaultValueProp,
  ...props
}) {
  const disabled = disabledProp ?? useFormDisabled();
  const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? "";
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      className: (0, import_clsx4.default)(
        "flex flex-col gap-xs",
        props.className
      ),
      children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("label", { className: "text-sm font-medium text-nowrap", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "textarea",
          {
            ...props,
            disabled,
            className: (0, import_clsx4.default)(
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
var import_clsx5 = __toESM(require("clsx"));
var import_jsx_runtime6 = require("react/jsx-runtime");
function Select({
  options,
  label,
  disabled: disabledProp,
  defaultValue: defaultValueProp,
  ...props
}) {
  const disabled = disabledProp ?? useFormDisabled();
  const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? "";
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "label",
    {
      className: (0, import_clsx5.default)(
        "flex flex-col gap-xs text-nowrap",
        props.className
      ),
      children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-sm", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "div",
          {
            className: (0, import_clsx5.default)(
              "bg-ink-0 border border-ink-600 rounded-md px-sm py-sm",
              "focus-within:ring-2 focus-within:ring-ink-200 focus-within:ring-offset-1",
              "hover:bg-ink-100",
              disabled && "cursor-not-allowed bg-ink-200",
              props.className
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "select",
              {
                ...props,
                disabled,
                className: (0, import_clsx5.default)(
                  "w-full h-full",
                  "outline-none bg-transparent ",
                  disabled && "cursor-not-allowed bg-ink-200"
                ),
                defaultValue,
                children: options?.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: option.value, children: option.label }, index))
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/form/checkbox.tsx
var import_clsx6 = __toESM(require("clsx"));
var import_jsx_runtime7 = require("react/jsx-runtime");
function Checkbox({
  label,
  disabled: disabledProp,
  defaultValue: defaultValueProp,
  className,
  ...props
}) {
  const disabled = disabledProp ?? useFormDisabled();
  const defaultValue = defaultValueProp ?? useFormInitialValues()[props.name ?? ""] ?? false;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "label",
    {
      className: (0, import_clsx6.default)(
        "flex items-center gap-sm select-none",
        disabled && "cursor-not-allowed opacity-80",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "input",
          {
            ...props,
            type: "checkbox",
            disabled,
            className: (0, import_clsx6.default)(
              "h-5 w-5 rounded border border-ink-600 bg-ink-0",
              "accent-primary",
              disabled && "cursor-not-allowed bg-ink-200"
            ),
            defaultChecked: defaultValue
          }
        ),
        label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: label })
      ]
    }
  );
}

// src/components/form/divider.tsx
var import_clsx7 = __toESM(require("clsx"));
var import_jsx_runtime8 = require("react/jsx-runtime");
function AppDivider({
  label,
  align = "center",
  className,
  lineClassName,
  labelClassName
}) {
  const isLabeled = Boolean(label);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "div",
    {
      className: (0, import_clsx7.default)(
        "flex items-center w-full",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "div",
          {
            className: (0, import_clsx7.default)(
              "flex-grow border-t",
              isLabeled && (align === "left" ? "mr-xs" : align === "right" ? "ml-xs" : "mx-xs"),
              lineClassName
            )
          }
        ),
        isLabeled && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "span",
          {
            className: (0, import_clsx7.default)(
              "text-sm text-ink",
              labelClassName
            ),
            children: label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "div",
          {
            className: (0, import_clsx7.default)(
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
var import_clsx8 = __toESM(require("clsx"));
var import_jsx_runtime9 = require("react/jsx-runtime");
function AppOverlay({
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      ...props,
      className: (0, import_clsx8.default)(
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
var import_clsx9 = __toESM(require("clsx"));
var import_jsx_runtime10 = require("react/jsx-runtime");
function Info({
  children,
  type = "info",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      ...props,
      className: (0, import_clsx9.default)(
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
var import_fi = require("react-icons/fi");
var import_clsx10 = __toESM(require("clsx"));
var import_jsx_runtime11 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: (0, import_clsx10.default)(
    "flex flex-col md:flex-row md:items-center md:justify-between",
    "px-sm py-sm",
    "text-ink"
  ), children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { children: [
      "Trang ",
      current,
      " / ",
      totalPages
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex flex-col xs:flex-row xs:items-center gap-xs", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "button",
          {
            disabled: page === 0,
            onClick: () => onPageChange(page - 1),
            className: (0, import_clsx10.default)(
              "px-sm py-xs rounded-md flex items-center gap-xs font-medium",
              page === 0 ? "text-ink/50" : "text-secondary hover:bg-secondary/20"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_fi.FiChevronLeft, {}),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "hidden sm:inline", children: "Tr\u01B0\u1EDBc" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { children: Array.from({ length: right - left + 1 }, (_, i) => left + i).map(((p) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          "button",
          {
            onClick: () => onPageChange(p - 1),
            className: (0, import_clsx10.default)(
              "px-sm py-xs rounded-md font-medium text-secondary",
              p === current ? "bg-secondary/20" : "hover:bg-secondary/10"
            ),
            children: p
          },
          p
        ))) }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "button",
          {
            disabled: current >= totalPages,
            onClick: () => onPageChange(page + 1),
            className: (0, import_clsx10.default)(
              "px-sm py-xs rounded-md flex items-center gap-xs font-medium",
              current >= totalPages ? "text-ink/70" : "text-secondary hover:bg-secondary/20"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "hidden sm:inline", children: "Sau" }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_fi.FiChevronRight, {})
            ]
          }
        )
      ] }),
      onSizeChange && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "select",
        {
          value: size,
          onChange: (e) => onSizeChange(Number(e.target.value)),
          className: (0, import_clsx10.default)(
            "ml-sm border rounded-md px-xs py-xs bg-transparent text-ink",
            "focus:outline-none focus:ring-2 focus:ring-ink-200 focus:ring-offset-1",
            "hover:bg-ink-100"
          ),
          children: pageSizeOptions.map((v) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("option", { value: v, children: [
            v,
            " / Trang"
          ] }, v))
        }
      )
    ] })
  ] });
}

// src/components/table.tsx
var import_hi2 = require("react-icons/hi2");
var import_hi = require("react-icons/hi");
var import_react3 = require("react");
var import_clsx11 = __toESM(require("clsx"));
var import_jsx_runtime12 = require("react/jsx-runtime");
function AppTable({
  columns,
  data,
  rowKey,
  loading,
  onSortChange,
  select
}) {
  const [sorter, setSorter] = (0, import_react3.useState)();
  const getRowKey = (record) => typeof rowKey === "function" ? rowKey(record) : record[rowKey];
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "w-full bg-ink-0 relative flex flex-col gap-md", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("table", { className: "min-w-full border-collapse", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { children: [
        select && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("th", { className: (0, import_clsx11.default)(
          "border-y px-md py-md text-left",
          "font-medium text-primary-100 hover:text-ink bg-primary"
        ), children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex items-center gap-xs", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
        columns.map((col, index) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "th",
          {
            style: { width: col.width, textAlign: col.align },
            className: (0, import_clsx11.default)(
              "border-y px-md py-md text-left",
              "font-medium text-primary-100 bg-primary"
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
              "div",
              {
                className: (0, import_clsx11.default)(
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
                  col.sorter && (col.key === sorter?.field ? sorter.order === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_hi2.HiMiniChevronUp, {}) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_hi2.HiMiniChevronDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_hi2.HiMiniChevronUpDown, {})),
                  /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "whitespace-nowrap", children: col.title })
                ]
              }
            )
          },
          index
        ))
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tbody", { className: "", children: data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { colSpan: columns.length, className: "p-md text-center h-36", children: !loading && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_hi.HiOutlineDocumentSearch, { className: "w-6 h-6 text-ink/50 mx-auto mb-2" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "text-ink/50", children: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u" })
      ] }) }) }) : data.map((item, rowIndex) => {
        const key = typeof rowKey === "function" ? rowKey(item) : item[rowKey];
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("tr", { className: "hover:bg-ink-100 px-md py-sm", children: [
          select && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("td", { className: "border-b px-md py-md ", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
          columns.map((col, index) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "td",
            {
              style: { textAlign: col.align },
              className: (0, import_clsx11.default)(
                "border-b px-md py-sm text-nowrap",
                col.ellipsis && "max-w-[100px]"
              ),
              children: col.render ? col.render(
                col.dataIndex ? item[col.dataIndex] : void 0,
                item,
                rowIndex
              ) : col.dataIndex ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "px-md py-sm", children: item[col.dataIndex] }) : null
            },
            index
          ))
        ] }, rowIndex);
      }) })
    ] }) }),
    loading && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "absolute inset-0 flex items-center justify-center bg-ink-100/50", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(LoadingSpinner, {}) }),
    select && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex flex-col gap-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
        "\u0110\xE3 ch\u1ECDn: ",
        select.selectedRowKeys.length
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "div",
        {
          className: (0, import_clsx11.default)(
            "flex items-center gap-sm flex-wrap",
            select.selectedRowKeys.length === 0 && "opacity-50 pointer-events-none"
          ),
          children: select.actions?.map((action, index) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
var import_clsx12 = __toESM(require("clsx"));
var import_jsx_runtime13 = require("react/jsx-runtime");
function Tag({
  children,
  type = "info",
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "span",
    {
      ...props,
      className: (0, import_clsx12.default)(
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
var import_clsx13 = __toESM(require("clsx"));
var import_jsx_runtime14 = require("react/jsx-runtime");
function Card({
  title,
  description,
  actions,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    "div",
    {
      ...props,
      className: (0, import_clsx13.default)(
        "bg-ink-0 border-[1px] border-ink-200",
        "rounded-xl",
        props.className
      ),
      children: [
        (title || actions) && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
          "header",
          {
            className: (0, import_clsx13.default)(
              "px-lg py-md",
              "border-b border-ink-200",
              "flex items-center justify-between",
              "gap-md"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex-1", children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "font-medium", children: title }),
                description && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-secondary mt-xs", children: description })
              ] }),
              actions && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex items-center gap-sm", children: actions })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "px-lg py-lg", children })
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Info,
  LoadingSpinner,
  Overlay,
  Pagination,
  Select,
  Table,
  Tag,
  TextArea,
  TextInput,
  useFormDisabled,
  useFormInitialValues
});
