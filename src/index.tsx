// index.tsx
import clsx, { ClassValue } from "clsx";
import { LucideIcon } from "lucide-react";
import {
	ButtonHTMLAttributes,
	FC,
	ForwardRefExoticComponent,
	RefAttributes,
} from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z, ZodSchema } from "zod";

// Utility function to merge and conditionally apply class names
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// Common types for input and select elements
type ZodafElementBaseProps = {
	label?: string;
	name: string;
	register: UseFormRegister<any>;
	error?: any;
	description?: string;
	disabled?: boolean;
	placeholder?: string;
	icon?: LucideIcon;
	optional?: boolean;
};

export type ZodafInputElementProps = ZodafElementBaseProps;
export type ZodafSelectOption = { value: string; label: string };
export type ZodafSelectElementProps = ZodafElementBaseProps & {
	options?: ZodafSelectOption[];
};

// Functional component types for elements
export type ZodafInputElement = FC<ZodafInputElementProps>;
export type ZodafSelectElement = FC<ZodafSelectElementProps>;
export type ZodafSubmitElement = ForwardRefExoticComponent<
	ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>
>;

// Configuration type to allow custom mappings of form elements
export type ZodafConfig = {
	inputMapping?: Record<string, ZodafInputElement>;
	submitMapping?: Record<string, ZodafSubmitElement>;
	selectMapping?: Record<string, ZodafSelectElement>;
};

// AutoForm component base props for both package and client
export type AutoFormBaseProps<T extends ZodSchema> = {
	zodafConfig: ZodafConfig;
	form: ZodafForm<T>;
	className?: string;
};

export type AutoFormProps<T extends ZodSchema> = {
	form: ZodafForm<T>;
	className?: string;
};

// Field configuration type for flexible customization of individual fields
export type ZodafFieldConfig = {
	fieldType?: string;
	label?: string;
	description?: string;
	disabled?: boolean;
	placeholder?: string;
	props?: Record<string, any>;
	icon?: LucideIcon;
	optionsLabels?: Record<string, string>;
};

// AutoForm configuration, including optional handlers and submit settings
type AutoFormConfig<T> = T extends z.ZodObject<infer Shape>
	? {
			fieldsConfig?: Partial<Record<keyof Shape, ZodafFieldConfig>>;
			onSubmit?: (data: z.infer<T>) => any;
			onChange?: (data: z.infer<T>) => any;
			submitHidden?: boolean;
			submitLabel?: string;
			submitType?: string;
	  }
	: never;

// Main hook to generate form data from schema and configuration
export function useAutoForm<T extends ZodSchema>(
	schema: T,
	config: AutoFormConfig<T>
): ZodafForm<T> {
	return { schema, config };
}

// Type for the form generated from schema and configuration
export type ZodafForm<T extends ZodSchema> = {
	schema: T;
	config: AutoFormConfig<T>;
};

// Default field type mappings for Zod schema types
export const DEFAULT_MAPPING: Record<string, string> = {
	ZodString: "input",
	ZodNumber: "number",
	ZodBoolean: "checkbox",
	ZodDate: "date",
	ZodEnum: "select",
};

// Export the AutoFormBase component
export * from "./AutoFormBase";
