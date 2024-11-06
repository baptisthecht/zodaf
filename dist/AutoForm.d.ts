import { ZodSchema } from "zod";
type AutoFormProps = {
    schema: ZodSchema<any>;
    onSubmit: (values: any) => void;
    fieldTypes?: Record<string, string>;
};
export declare const AutoForm: React.FC<AutoFormProps>;
export {};
