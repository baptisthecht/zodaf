export const inputFieldTsx = `import { ZodafELementProps } from "@zodaf/react";

const InputField: React.FC<ZodafELementProps> = ({
	name,
	label,
	register,
	error,
}) => {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="block font-medium mb-1">
				{label}
			</label>
			<input
				id={name}
				{...register(name)}
				className={\`border px-3 py-2 w-full \${
					error ? "border-red-500" : "border-gray-300"
				} rounded\`}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export { InputField };
`;
