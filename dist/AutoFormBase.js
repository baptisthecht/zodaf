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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn, DEFAULT_MAPPING } from ".";
function isZodObject(schema) {
    return schema instanceof z.ZodObject;
}
var AutoFormBase = forwardRef(function (_a, ref) {
    var form = _a.form, zodafConfig = _a.zodafConfig, className = _a.className, props = __rest(_a, ["form", "zodafConfig", "className"]);
    var schema = form.schema, config = form.config;
    var _b = config.fieldsConfig, fieldsConfig = _b === void 0 ? {} : _b, onSubmit = config.onSubmit, onChange = config.onChange, _c = config.submitHidden, submitHidden = _c === void 0 ? false : _c, _d = config.submitLabel, submitLabel = _d === void 0 ? "Submit" : _d;
    var _e = useForm({
        defaultValues: isZodObject(schema)
            ? Object.keys(schema.shape).reduce(function (acc, key) {
                acc[key] = "";
                return acc;
            }, {})
            : {},
    }), register = _e.register, handleSubmit = _e.handleSubmit, errors = _e.formState.errors;
    var onSubmitForm = function (data) {
        var result = schema.safeParse(data);
        if (result.success) {
            if (onSubmit) {
                onSubmit(result.data);
            }
        }
        else {
            console.error(result.error);
        }
    };
    var Submit = zodafConfig.submit;
    if (!Submit && !submitHidden) {
        throw new Error("No component found for fieldType: submit. Please check your zodaf.config.ts file or hide submit button by adding submitHidden into form config.");
    }
    return (_jsxs("form", __assign({ ref: ref, onSubmit: handleSubmit(onSubmitForm), className: cn("grid gap-4", className) }, props, { children: [isZodObject(schema) &&
                Object.keys(schema.shape).map(function (key) {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    var fieldType = "";
                    if (fieldsConfig[key] && fieldsConfig[key].fieldType) {
                        fieldType = fieldsConfig[key].fieldType;
                    }
                    else {
                        fieldType =
                            DEFAULT_MAPPING[schema.shape[key]._def
                                .typeName];
                    }
                    var Comp = (_a = zodafConfig.mapping) === null || _a === void 0 ? void 0 : _a[fieldType];
                    if (!Comp) {
                        throw new Error("No component found for fieldType: ".concat(fieldType, ". Please check your zodaf.config.ts file."));
                    }
                    var message = (_b = errors[key]) === null || _b === void 0 ? void 0 : _b.message;
                    return (_jsx(Comp, __assign({ label: ((_c = fieldsConfig[key]) === null || _c === void 0 ? void 0 : _c.label) ||
                            schema.shape[key].description ||
                            key, description: (_d = fieldsConfig[key]) === null || _d === void 0 ? void 0 : _d.description, disabled: (_e = fieldsConfig[key]) === null || _e === void 0 ? void 0 : _e.disabled, placeholder: (_f = fieldsConfig[key]) === null || _f === void 0 ? void 0 : _f.placeholder, error: typeof message === "object"
                            ? (_g = message === null || message === void 0 ? void 0 : message.message) === null || _g === void 0 ? void 0 : _g.toString()
                            : message, register: register, name: key }, (_h = fieldsConfig[key]) === null || _h === void 0 ? void 0 : _h.props), key));
                }), Submit && !submitHidden && _jsx(Submit, { children: submitLabel })] })));
});
AutoFormBase.displayName = "AutoFormBase";
export { AutoFormBase };
