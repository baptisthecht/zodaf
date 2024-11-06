import { forwardRef } from "react";
import { AutoFormProps } from "..";
import { AutoFormBase } from "../AutoFormBase";
import { config } from "./zodaf.config";

export const AutoForm = forwardRef<HTMLFormElement, AutoFormProps<any>>(
	({ form, className }, ref) => {
		return (
			<AutoFormBase
				form={form}
				zodafConfig={config}
				className={className}
			/>
		);
	}
);

AutoFormBase.displayName = "AutoFormBase";
