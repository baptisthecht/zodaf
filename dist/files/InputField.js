var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var InputField = function (_a) {
    var name = _a.name, label = _a.label, register = _a.register, error = _a.error, disabled = _a.disabled, description = _a.description;
    return (_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: name, className: "block font-medium mb-1", children: label }), _jsx("input", __assign({ disabled: disabled, id: name }, register(name), { className: "border px-3 py-2 w-full ".concat(error ? "border-red-500" : "border-gray-300", " rounded") })), description && (_jsx("p", { className: "text-gray-500 text-sm mt-1", children: description })), error && _jsx("p", { className: "text-red-500 text-sm mt-1", children: error })] }));
};
export { InputField };
