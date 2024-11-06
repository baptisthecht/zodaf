export const AutoFormTsx = `import { forwardRef } from "react";
import { AutoFormBase, AutoFormProps } from "@zodaf/react";
import { config } from "../../../../zodaf.config";

export const AutoForm = forwardRef<HTMLFormElement, AutoFormProps<any>>(
	({ onSubmit, schema, fieldsConfig }, ref) => {
		return (
			<AutoFormBase
				onSubmit={onSubmit}
				ref={ref}
				schema={schema}
				config={config}
				fieldsConfig={fieldsConfig}
			/>
		);
	}
);

AutoFormBase.displayName = "AutoFormBase";

`;
