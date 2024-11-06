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
import { useState } from "react";
import { z } from "zod";
function isZodObject(schema) {
    return schema instanceof z.ZodObject;
}
export var AutoForm = function (_a) {
    var schema = _a.schema, onSubmit = _a.onSubmit, fieldTypes = _a.fieldTypes;
    var _b = useState(function () {
        var defaultData = {};
        if (isZodObject(schema)) {
            Object.keys(schema.shape).forEach(function (key) {
                defaultData[key] = "";
            });
        }
        return defaultData;
    }), formData = _b[0], setFormData = _b[1];
    var handleChange = function (name, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var result = schema.safeParse(formData);
        if (result.success) {
            onSubmit(result.data);
        }
        else {
            console.error(result.error);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [isZodObject(schema) &&
                Object.keys(schema.shape).map(function (key) {
                    return (_jsxs("div", { children: [_jsx("label", { children: key }), _jsx("input", { name: key, value: formData[key], onChange: function (value) { return handleChange(key, value); } })] }, key));
                }), _jsx("button", { type: "submit", children: "Submit" }), _jsx("button", { onClick: function () { return console.log("tests"); }, children: "LogConfig" })] }));
};
