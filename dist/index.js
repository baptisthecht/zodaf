import clsx from "clsx";
import { twMerge } from "tailwind-merge";
export function useAutoForm(schema, config) {
    return {
        schema: schema,
        config: config,
    };
}
export function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return twMerge(clsx(inputs));
}
// Data
export var DEFAULT_MAPPING = {
    ZodString: "input",
    ZodNumber: "number",
    ZodBoolean: "checkbox",
    ZodDate: "date",
};
// Exports
export * from "./AutoFormBase";
