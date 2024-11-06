import { ClassValue } from "clsx";
import { ButtonHTMLAttributes, FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { UseFormRegister } from "react-hook-form";
import { z, ZodSchema } from "zod";
export type ZodafELementProps = {
    label?: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    description?: string;
    disabled?: boolean;
    placeholder?: string;
};
export type ZodafElement = FC<ZodafELementProps>;
export type SubmitType = ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>;
export type ZodafConfig = {
    mapping?: Record<string, ZodafElement>;
    submit?: SubmitType;
};
export type ZodafFieldConfig = {
    fieldType?: string;
    label?: string;
    description?: string;
    disabled?: boolean;
    placeholder?: string;
    props?: Record<string, any>;
};
export type AutoFormBaseProps<T extends ZodSchema> = {
    zodafConfig: ZodafConfig;
    form: ZodafForm<T>;
    className?: string;
};
export type AutoFormProps<T extends ZodSchema> = {
    form: ZodafForm<T>;
    className?: string;
};
type AutoFormConfig<T> = T extends z.ZodObject<infer Shape> ? {
    fieldsConfig?: {
        [K in keyof Shape]?: ZodafFieldConfig;
    };
    onSubmit?: (data: z.infer<T>) => any;
    onChange?: (data: z.infer<T>) => any;
    submitHidden?: boolean;
    submitLabel?: string;
} : never;
export declare function useAutoForm<T extends z.ZodSchema>(schema: T, config: AutoFormConfig<T>): ZodafForm<T>;
export type ZodafForm<T extends z.ZodSchema> = {
    schema: T;
    config: AutoFormConfig<T>;
};
export declare function cn(...inputs: ClassValue[]): string;
export declare const DEFAULT_MAPPING: Record<string, string>;
export * from "./AutoFormBase";
