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

// src/components/tab.tsx
import { useEffect as useEffect3, useRef as useRef3, useState as useState4 } from "react";
import clsx11 from "clsx";

// node_modules/react-router-dom/dist/index.js
import * as React2 from "react";
import * as ReactDOM from "react-dom";

// node_modules/react-router/dist/index.js
import * as React from "react";

// node_modules/@remix-run/router/dist/router.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function convertRouteMatchToUiMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo2, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo2[paramName] = void 0;
    } else {
      memo2[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo2;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
var ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX$1.test(url);
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    if (isAbsoluteUrl(toPathname)) {
      pathname = toPathname;
    } else {
      if (toPathname.includes("//")) {
        let oldPathname = toPathname;
        toPathname = toPathname.replace(/\/\/+/g, "/");
        warning(false, "Pathnames cannot have embedded double slashes - normalizing " + (oldPathname + " -> " + toPathname));
      }
      if (toPathname.startsWith("/")) {
        pathname = resolvePathname(toPathname.substring(1), "/");
      } else {
        pathname = resolvePathname(toPathname, fromPathname);
      }
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
var validMutationMethodsArr = ["post", "put", "patch", "delete"];
var validMutationMethods = new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
var validRequestMethods = new Set(validRequestMethodsArr);

// node_modules/react-router/dist/index.js
function _extends2() {
  _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
var DataRouterContext = /* @__PURE__ */ React.createContext(null);
if (process.env.NODE_ENV !== "production") {
  DataRouterContext.displayName = "DataRouter";
}
var DataRouterStateContext = /* @__PURE__ */ React.createContext(null);
if (process.env.NODE_ENV !== "production") {
  DataRouterStateContext.displayName = "DataRouterState";
}
var AwaitContext = /* @__PURE__ */ React.createContext(null);
if (process.env.NODE_ENV !== "production") {
  AwaitContext.displayName = "Await";
}
var NavigationContext = /* @__PURE__ */ React.createContext(null);
if (process.env.NODE_ENV !== "production") {
  NavigationContext.displayName = "Navigation";
}
var LocationContext = /* @__PURE__ */ React.createContext(null);
if (process.env.NODE_ENV !== "production") {
  LocationContext.displayName = "Location";
}
var RouteContext = /* @__PURE__ */ React.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
if (process.env.NODE_ENV !== "production") {
  RouteContext.displayName = "Route";
}
var RouteErrorContext = /* @__PURE__ */ React.createContext(null);
if (process.env.NODE_ENV !== "production") {
  RouteErrorContext.displayName = "RouteError";
}
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let {
    basename,
    navigator
  } = React.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return React.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  return React.useContext(LocationContext).location;
}
var navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function useIsomorphicLayoutEffect(cb) {
  let isStatic = React.useContext(NavigationContext).static;
  if (!isStatic) {
    React.useLayoutEffect(cb);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = React.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(
    false,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : invariant(false) : void 0;
  let dataRouterContext = React.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator
  } = React.useContext(NavigationContext);
  let {
    matches
  } = React.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  let activeRef = React.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    process.env.NODE_ENV !== "production" ? warning(activeRef.current, navigateEffectWarning) : void 0;
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = React.useContext(NavigationContext);
  let {
    matches
  } = React.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
  return React.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
var DataRouterHook = /* @__PURE__ */ (function(DataRouterHook3) {
  DataRouterHook3["UseBlocker"] = "useBlocker";
  DataRouterHook3["UseRevalidator"] = "useRevalidator";
  DataRouterHook3["UseNavigateStable"] = "useNavigate";
  return DataRouterHook3;
})(DataRouterHook || {});
var DataRouterStateHook = /* @__PURE__ */ (function(DataRouterStateHook3) {
  DataRouterStateHook3["UseBlocker"] = "useBlocker";
  DataRouterStateHook3["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook3["UseActionData"] = "useActionData";
  DataRouterStateHook3["UseRouteError"] = "useRouteError";
  DataRouterStateHook3["UseNavigation"] = "useNavigation";
  DataRouterStateHook3["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook3["UseMatches"] = "useMatches";
  DataRouterStateHook3["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook3["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook3["UseRouteId"] = "useRouteId";
  return DataRouterStateHook3;
})(DataRouterStateHook || {});
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = React.useContext(DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = React.useContext(DataRouterStateContext);
  !state ? process.env.NODE_ENV !== "production" ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = React.useContext(RouteContext);
  !route ? process.env.NODE_ENV !== "production" ? invariant(false, getDataRouterConsoleError(hookName)) : invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? process.env.NODE_ENV !== "production" ? invariant(false, hookName + ' can only be used on routes that contain a unique "id"') : invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}
function useNavigation() {
  let state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return React.useMemo(() => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)), [matches, loaderData]);
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
  let activeRef = React.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = React.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    process.env.NODE_ENV !== "production" ? warning(activeRef.current, navigateEffectWarning) : void 0;
    if (!activeRef.current) return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends2({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
var alreadyWarned = {};
function warnOnce(key, message) {
  if (process.env.NODE_ENV !== "production" && !alreadyWarned[message]) {
    alreadyWarned[message] = true;
    console.warn(message);
  }
}
var logDeprecation = (flag, msg, link) => warnOnce(flag, "\u26A0\uFE0F React Router Future Flag Warning: " + msg + ". " + ("You can use the `" + flag + "` future flag to opt-in early. ") + ("For more information, see " + link + "."));
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0) {
    logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
  }
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0)) {
    logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
  }
  if (routerFuture) {
    if (routerFuture.v7_fetcherPersist === void 0) {
      logDeprecation("v7_fetcherPersist", "The persistence behavior of fetchers is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist");
    }
    if (routerFuture.v7_normalizeFormMethod === void 0) {
      logDeprecation("v7_normalizeFormMethod", "Casing of `formMethod` fields is being normalized to uppercase in v7", "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod");
    }
    if (routerFuture.v7_partialHydration === void 0) {
      logDeprecation("v7_partialHydration", "`RouterProvider` hydration behavior is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_partialhydration");
    }
    if (routerFuture.v7_skipActionErrorRevalidation === void 0) {
      logDeprecation("v7_skipActionErrorRevalidation", "The revalidation behavior after 4xx/5xx `action` responses is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation");
    }
  }
}
var START_TRANSITION = "startTransition";
var startTransitionImpl = React[START_TRANSITION];
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? process.env.NODE_ENV !== "production" ? invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = React.useMemo(() => ({
    basename,
    navigator,
    static: staticProp,
    future: _extends2({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = React.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  process.env.NODE_ENV !== "production" ? warning(locationContext != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything.") : void 0;
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
var neverSettledPromise = new Promise(() => {
});

// node_modules/react-router-dom/dist/index.js
function _extends3() {
  _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo2, key) => {
    let value = init[key];
    return memo2.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach((value) => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    process.env.NODE_ENV !== "production" ? warning(false, '"' + encType + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + defaultEncType + '"')) : void 0;
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0");
        formData.append(prefix + "y", "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
var _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"];
var _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"];
var _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"];
var REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
}
var ViewTransitionContext = /* @__PURE__ */ React2.createContext({
  isTransitioning: false
});
if (process.env.NODE_ENV !== "production") {
  ViewTransitionContext.displayName = "ViewTransition";
}
var FetchersContext = /* @__PURE__ */ React2.createContext(/* @__PURE__ */ new Map());
if (process.env.NODE_ENV !== "production") {
  FetchersContext.displayName = "Fetchers";
}
var START_TRANSITION2 = "startTransition";
var startTransitionImpl2 = React2[START_TRANSITION2];
var FLUSH_SYNC = "flushSync";
var flushSyncImpl = ReactDOM[FLUSH_SYNC];
var USE_ID = "useId";
var useIdImpl = React2[USE_ID];
function HistoryRouter(_ref6) {
  let {
    basename,
    children,
    future,
    history
  } = _ref6;
  let [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  React2.useLayoutEffect(() => history.listen(setState), [history, setState]);
  React2.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
if (process.env.NODE_ENV !== "production") {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var Link = /* @__PURE__ */ React2.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = React2.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        process.env.NODE_ENV !== "production" ? warning(false, '<Link to="' + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.') : void 0;
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace: replace2,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ React2.createElement("a", _extends3({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
if (process.env.NODE_ENV !== "production") {
  Link.displayName = "Link";
}
var NavLink = /* @__PURE__ */ React2.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children
  } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
  let path = useResolvedPath(to, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = React2.useContext(DataRouterStateContext);
  let {
    navigator,
    basename
  } = React2.useContext(NavigationContext);
  let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && viewTransition === true;
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
  }
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /* @__PURE__ */ React2.createElement(Link, _extends3({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to,
    viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (process.env.NODE_ENV !== "production") {
  NavLink.displayName = "NavLink";
}
var Form2 = /* @__PURE__ */ React2.forwardRef((_ref9, forwardedRef) => {
  let {
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition
  } = _ref9, props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = (event) => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace: replace2,
      state,
      relative,
      preventScrollReset,
      viewTransition
    });
  };
  return /* @__PURE__ */ React2.createElement("form", _extends3({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (process.env.NODE_ENV !== "production") {
  Form2.displayName = "Form";
}
function ScrollRestoration(_ref10) {
  let {
    getKey,
    storageKey
  } = _ref10;
  useScrollRestoration({
    getKey,
    storageKey
  });
  return null;
}
if (process.env.NODE_ENV !== "production") {
  ScrollRestoration.displayName = "ScrollRestoration";
}
var DataRouterHook2;
(function(DataRouterHook3) {
  DataRouterHook3["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook3["UseSubmit"] = "useSubmit";
  DataRouterHook3["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook3["UseFetcher"] = "useFetcher";
  DataRouterHook3["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook2 || (DataRouterHook2 = {}));
var DataRouterStateHook2;
(function(DataRouterStateHook3) {
  DataRouterStateHook3["UseFetcher"] = "useFetcher";
  DataRouterStateHook3["UseFetchers"] = "useFetchers";
  DataRouterStateHook3["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook2 || (DataRouterStateHook2 = {}));
function getDataRouterConsoleError2(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext2(hookName) {
  let ctx = React2.useContext(DataRouterContext);
  !ctx ? process.env.NODE_ENV !== "production" ? invariant(false, getDataRouterConsoleError2(hookName)) : invariant(false) : void 0;
  return ctx;
}
function useDataRouterState2(hookName) {
  let state = React2.useContext(DataRouterStateContext);
  !state ? process.env.NODE_ENV !== "production" ? invariant(false, getDataRouterConsoleError2(hookName)) : invariant(false) : void 0;
  return state;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return React2.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace: replace2,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
function useSearchParams(defaultInit) {
  process.env.NODE_ENV !== "production" ? warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.") : void 0;
  let defaultSearchParamsRef = React2.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = React2.useRef(false);
  let location = useLocation();
  let searchParams = React2.useMemo(() => (
    // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current)
  ), [location.search]);
  let navigate = useNavigate();
  let setSearchParams = React2.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true;
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
  }
}
var fetcherId = 0;
var getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
function useSubmit() {
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseSubmit);
  let {
    basename
  } = React2.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return React2.useCallback(function(target, options) {
    if (options === void 0) {
      options = {};
    }
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        flushSync: options.flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        flushSync: options.flushSync,
        viewTransition: options.viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = React2.useContext(NavigationContext);
  let routeContext = React2.useContext(RouteContext);
  !routeContext ? process.env.NODE_ENV !== "production" ? invariant(false, "useFormAction must be used inside a RouteContext") : invariant(false) : void 0;
  let [match] = routeContext.matches.slice(-1);
  let path = _extends3({}, useResolvedPath(action ? action : ".", {
    relative
  }));
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v) => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v) => v).forEach((v) => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? "?" + qs : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
function useScrollRestoration(_temp4) {
  let {
    getKey,
    storageKey
  } = _temp4 === void 0 ? {} : _temp4;
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState2(DataRouterStateHook2.UseScrollRestoration);
  let {
    basename
  } = React2.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  let navigation = useNavigation();
  React2.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(React2.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    try {
      sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    } catch (error) {
      process.env.NODE_ENV !== "production" ? warning(false, "Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (" + error + ").") : void 0;
    }
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches]));
  if (typeof document !== "undefined") {
    React2.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
      }
    }, [storageKey]);
    React2.useLayoutEffect(() => {
      let getKeyWithoutBasename = getKey && basename !== "/" ? (location2, matches2) => getKey(
        // Strip the basename to match useLocation()
        _extends3({}, location2, {
          pathname: stripBasename(location2.pathname, basename) || location2.pathname
        }),
        matches2
      ) : getKey;
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename, getKey]);
    React2.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location.hash) {
        let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function useViewTransitionState(to, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = React2.useContext(ViewTransitionContext);
  !(vtContext != null) ? process.env.NODE_ENV !== "production" ? invariant(false, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : invariant(false) : void 0;
  let {
    basename
  } = useDataRouterContext2(DataRouterHook2.useViewTransitionState);
  let path = useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}

// src/components/tab.tsx
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
function Tabs({
  items,
  defaultKey = "",
  onChange
}) {
  const itemsFilter = items.filter((d) => d != null && typeof d === "object" && "key" in d);
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [currentKey, setCurrentKey] = useState4(
    tabFromUrl || defaultKey || itemsFilter.find((i) => i)?.key
  );
  const containerRef = useRef3(null);
  const tabRefs = useRef3({});
  useEffect3(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== currentKey) {
      setCurrentKey(tab);
    }
  }, [searchParams]);
  const activeTab = itemsFilter.find((i) => i.key === currentKey);
  return /* @__PURE__ */ jsxs8("div", { className: "flex flex-col gap-md", children: [
    /* @__PURE__ */ jsx12(
      "div",
      {
        ref: containerRef,
        className: clsx11(
          "relative",
          "w-full overflow-x-auto overflow-y-hidden",
          "border-b border-ink-300"
        ),
        children: /* @__PURE__ */ jsx12("div", { className: "flex gap-sm min-w-max px-xs", children: itemsFilter.map((item) => {
          if (!item) return null;
          const active = item.key === currentKey;
          return /* @__PURE__ */ jsxs8(
            "button",
            {
              ref: (el) => {
                tabRefs.current[item.key] = el;
              },
              onClick: () => {
                setCurrentKey(item.key);
                setSearchParams({ tab: item.key }, { replace: true });
                onChange?.(item.key);
              },
              className: clsx11(
                "relative",
                "px-md py-sm",
                "flex items-center gap-sm",
                "rounded-t-md",
                active ? "text-primary bg-ink-50" : "text-ink/70 hover:text-ink hover:bg-ink-100"
              ),
              children: [
                item.icon && /* @__PURE__ */ jsx12("span", { className: "w-[16px] h-[16px] flex items-center", children: item.icon }),
                /* @__PURE__ */ jsx12("span", { className: "text-nowrap", children: item.label }),
                active && /* @__PURE__ */ jsx12("span", { className: "absolute left-0 right-0 -bottom-[1px] h-[2px] bg-primary" })
              ]
            },
            item.key
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx12("div", { className: "p-md bg-ink-0 rounded-md border border-ink-300", children: activeTab?.content })
  ] });
}

// src/components/table.tsx
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniChevronUpDown } from "react-icons/hi2";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useState as useState5 } from "react";
import clsx12 from "clsx";
import { Fragment as Fragment3, jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
function AppTable({
  columns,
  data,
  rowKey,
  loading,
  onSortChange,
  select
}) {
  const [sorter, setSorter] = useState5();
  const getRowKey = (record) => typeof rowKey === "function" ? rowKey(record) : record[rowKey];
  return /* @__PURE__ */ jsxs9("div", { className: "w-full bg-ink-0 relative flex flex-col gap-md", children: [
    /* @__PURE__ */ jsx13("div", { className: "w-full overflow-x-auto", children: /* @__PURE__ */ jsxs9("table", { className: "min-w-full border-collapse", children: [
      /* @__PURE__ */ jsx13("thead", { children: /* @__PURE__ */ jsxs9("tr", { children: [
        select && /* @__PURE__ */ jsx13("th", { className: clsx12(
          "border-y px-md py-md text-left",
          "font-medium text-primary-100 hover:text-ink bg-primary"
        ), children: /* @__PURE__ */ jsx13("div", { className: "flex items-center gap-xs", children: /* @__PURE__ */ jsx13(
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
        columns.map((col, index) => /* @__PURE__ */ jsx13(
          "th",
          {
            style: { width: col.width, textAlign: col.align },
            className: clsx12(
              "border-y px-md py-md text-left",
              "font-medium text-primary-100 bg-primary"
            ),
            children: /* @__PURE__ */ jsxs9(
              "div",
              {
                className: clsx12(
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
                  col.sorter && (col.key === sorter?.field ? sorter.order === "asc" ? /* @__PURE__ */ jsx13(HiMiniChevronUp, {}) : /* @__PURE__ */ jsx13(HiMiniChevronDown, {}) : /* @__PURE__ */ jsx13(HiMiniChevronUpDown, {})),
                  /* @__PURE__ */ jsx13("span", { className: "whitespace-nowrap", children: col.title })
                ]
              }
            )
          },
          index
        ))
      ] }) }),
      /* @__PURE__ */ jsx13("tbody", { className: "", children: data.length === 0 ? /* @__PURE__ */ jsx13("tr", { children: /* @__PURE__ */ jsx13("td", { colSpan: columns.length, className: "p-md text-center h-36", children: !loading && /* @__PURE__ */ jsxs9(Fragment3, { children: [
        /* @__PURE__ */ jsx13(HiOutlineDocumentSearch, { className: "w-6 h-6 text-ink/50 mx-auto mb-2" }),
        /* @__PURE__ */ jsx13("span", { className: "text-ink/50", children: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u" })
      ] }) }) }) : data.map((item, rowIndex) => {
        const key = typeof rowKey === "function" ? rowKey(item) : item[rowKey];
        return /* @__PURE__ */ jsxs9("tr", { className: "hover:bg-ink-100 px-md py-sm", children: [
          select && /* @__PURE__ */ jsx13("td", { className: "border-b px-md py-md ", children: /* @__PURE__ */ jsx13(
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
          columns.map((col, index) => /* @__PURE__ */ jsx13(
            "td",
            {
              style: { textAlign: col.align },
              className: clsx12(
                "border-b px-md py-sm text-nowrap",
                col.ellipsis && "max-w-[100px]"
              ),
              children: col.render ? col.render(
                col.dataIndex ? item[col.dataIndex] : void 0,
                item,
                rowIndex
              ) : col.dataIndex ? /* @__PURE__ */ jsx13("span", { className: "px-md py-sm", children: item[col.dataIndex] }) : null
            },
            index
          ))
        ] }, rowIndex);
      }) })
    ] }) }),
    loading && /* @__PURE__ */ jsx13("div", { className: "absolute inset-0 flex items-center justify-center bg-ink-100/50", children: /* @__PURE__ */ jsx13(LoadingSpinner, {}) }),
    select && /* @__PURE__ */ jsxs9("div", { className: "flex flex-col gap-sm", children: [
      /* @__PURE__ */ jsxs9("span", { children: [
        "\u0110\xE3 ch\u1ECDn: ",
        select.selectedRowKeys.length
      ] }),
      /* @__PURE__ */ jsx13(
        "div",
        {
          className: clsx12(
            "flex items-center gap-sm flex-wrap",
            select.selectedRowKeys.length === 0 && "opacity-50 pointer-events-none"
          ),
          children: select.actions?.map((action, index) => /* @__PURE__ */ jsx13(
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
import clsx13 from "clsx";
import { jsx as jsx14 } from "react/jsx-runtime";
function Tag({
  children,
  type = "info",
  ...props
}) {
  return /* @__PURE__ */ jsx14(
    "span",
    {
      ...props,
      className: clsx13(
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
export {
  Button,
  Checkbox,
  AppDivider as Divider,
  Form,
  Info,
  LoadingSpinner,
  AppOverlay as Overlay,
  AppPagination as Pagination,
  Select,
  Tabs as Tab,
  AppTable as Table,
  Tag,
  Textarea as TextArea,
  Input as TextInput,
  useFormDisabled,
  useFormInitialValues
};
/*! Bundled license information:

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.23.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.30.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.30.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
