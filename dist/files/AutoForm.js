import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { AutoFormBase } from "../AutoFormBase";
import { config } from "./zodaf.config";
export var AutoForm = forwardRef(function (_a, ref) {
    var form = _a.form, className = _a.className;
    return (_jsx(AutoFormBase, { form: form, zodafConfig: config, className: className }));
});
AutoFormBase.displayName = "AutoFormBase";
