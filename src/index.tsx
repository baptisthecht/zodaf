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

// Component
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

export type SubmitType = ForwardRefExoticComponent<
	ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>
>;
// Config
export type ZodafConfig = {
	mapping?: Record<string, ZodafElement>;
	submit?: SubmitType;
};

// AutoForm utils
export type ZodafFieldConfig = {
	fieldType?: string;
	label?: string;
	description?: string;
	disabled?: boolean;
	placeholder?: string;
	props?: Record<string, any>;
	icon?: LucideIcon;
};

// AutoFormBase (package)
export type AutoFormBaseProps<T extends ZodSchema> = {
	zodafConfig: ZodafConfig;
	form: ZodafForm<T>;
	className?: string;
};

// AutoFormBase (client)
export type AutoFormProps<T extends ZodSchema> = {
	form: ZodafForm<T>;
	className?: string;
};

type AutoFormConfig<T> = T extends z.ZodObject<infer Shape>
	? {
			fieldsConfig?: {
				[K in keyof Shape]?: ZodafFieldConfig;
			};
			onSubmit?: (data: z.infer<T>) => any;
			onChange?: (data: z.infer<T>) => any;
			submitHidden?: boolean;
			submitLabel?: string;
	  }
	: never;

export function useAutoForm<T extends z.ZodSchema>(
	schema: T,
	config: AutoFormConfig<T>
): ZodafForm<T> {
	return {
		schema,
		config,
	};
}

export type ZodafForm<T extends z.ZodSchema> = {
	schema: T;
	config: AutoFormConfig<T>;
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Data
export const DEFAULT_MAPPING: Record<string, string> = {
	ZodString: "input",
	ZodNumber: "number",
	ZodBoolean: "checkbox",
	ZodDate: "date",
};

// Exports
export * from "./AutoFormBase";
