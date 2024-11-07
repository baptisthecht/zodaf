import { ZodafInputElementProps } from "..";

const InputField: React.FC<ZodafInputElementProps> = ({
	name,
	label,
	register,
	error,
	disabled,
	description,
}) => {
	return (
		<div className="mb-4">
			<label htmlFor={name} className="block font-medium mb-1">
				{label}
			</label>
			<input
				disabled={disabled}
				id={name}
				{...register(name)}
				className={`border px-3 py-2 w-full ${
					error ? "border-red-500" : "border-gray-300"
				} rounded`}
			/>
			{description && (
				<p className="text-gray-500 text-sm mt-1">{description}</p>
			)}
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export { InputField };
