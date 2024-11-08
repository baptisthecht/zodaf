import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z, ZodObject, ZodSchema } from "zod";
import {
	AutoFormBaseProps,
	cn,
	DEFAULT_MAPPING,
	ZodafInputElement,
	ZodafSelectElement,
	ZodafSelectOption,
} from ".";

function isZodObject(schema: ZodSchema): schema is ZodObject<any> {
	return schema instanceof z.ZodObject;
}

// Fonction pour transformer les champs en booleans ou nombres automatiquement
const transformData = (data: Record<string, any>, schema: any) => {
	console.log(data);
	const transformedData: Record<string, any> = {};

	Object.keys(data).forEach((key) => {
		let value = data[key];

		// Si le champ est un nombre ou un booléen dans le schema
		const fieldType = schema.shape[key]?._def.typeName;

		if (typeof value === "string") {
			// Convertir en nombre si le champ est de type number
			if (fieldType === "ZodNumber" && typeof value === "string") {
				if (!isNaN(Number(value))) {
					transformedData[key] = Number(value); // Conversion en nombre
				} else {
					transformedData[key] = value; // Laisser la valeur inchangée si ce n'est pas un nombre
				}
			}
		} else {
			transformedData[key] = value; // Laisser les autres types inchangés
		}
	});

	return transformedData;
};

const AutoFormBase = forwardRef<HTMLFormElement, AutoFormBaseProps<any>>(
	({ form, zodafConfig, className, ...props }, ref) => {
		const { schema, config } = form;
		const {
			fieldsConfig = {},
			onSubmit,
			onChange,
			submitHidden = false,
			submitLabel = "Submit",
			showOptional,
			showRequired,
			showDescriptionOnError,
			submitType,
		} = config;
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm({
			mode: "onBlur",
			resolver: zodResolver(schema),
			defaultValues: isZodObject(schema)
				? Object.keys(schema.shape).reduce((acc, key) => {
						acc[key] = "";
						return acc;
				  }, {} as Record<string, any>)
				: {},
		});

		// OnSubmit Form avec transformation des données
		const onSubmitForm = (data: z.infer<typeof schema>) => {
			// Transformer les données avant de les passer au schema
			const transformedData = transformData(data, schema);
			console.log(data);
			const result = schema.safeParse(transformedData); // Valider avec le schéma
			if (result.success) {
				if (onSubmit) {
					onSubmit(result.data);
				}
			} else {
				return;
			}
		};

		const Submit =
			zodafConfig.submitMapping?.[config.submitType || "submit"];
		if (!Submit && !submitHidden) {
			throw new Error(
				`No component found for submit type: ${
					config.submitType || "submit"
				}. Please check your zodaf.config.ts file or hide submit button by adding submitHidden into form config.`
			);
		}

		return (
			<form
				ref={ref}
				onSubmit={handleSubmit(onSubmitForm)}
				className={cn("grid gap-4", className)}
				{...props}>
				{isZodObject(schema) &&
					Object.keys(schema.shape).map((key) => {
						let optionnal = false;
						let fieldType = "";
						if (fieldsConfig[key] && fieldsConfig[key].fieldType) {
							fieldType = fieldsConfig[key].fieldType;
						} else {
							if (
								schema.shape[key]._def.typeName ===
								"ZodOptional"
							) {
								optionnal = true;
								fieldType =
									DEFAULT_MAPPING[
										schema.shape[key]._def.innerType._def
											.typeName as z.ZodFirstPartyTypeKind
									];
							} else {
								fieldType =
									DEFAULT_MAPPING[
										schema.shape[key]._def
											.typeName as z.ZodFirstPartyTypeKind
									];
							}
						}

						// Extraire le message d'erreur
						const errorMessage = errors[key]?.message;
						const message =
							typeof errorMessage === "string"
								? errorMessage
								: errorMessage?.message;

						let options: ZodafSelectOption[] = [];
						let Comp: ZodafInputElement | ZodafSelectElement;

						if (
							(schema.shape[key]._def
								.typeName as z.ZodFirstPartyTypeKind) ===
								"ZodEnum" ||
							(schema.shape[key]._def
								.typeName as z.ZodFirstPartyTypeKind) ===
								"ZodNativeEnum"
						) {
							options = schema.shape[key]._def.values.map(
								(value: string) => {
									const fieldsConfigValue =
										fieldsConfig[key]?.optionsLabels;
									return {
										value,
										label:
											fieldsConfigValue?.[value] || value,
									};
								}
							);
							if (!zodafConfig.selectMapping?.[fieldType]) {
								throw new Error(
									"No component found for select fieldType: select. Please check your zodaf.config.ts file."
								);
							}
							Comp = zodafConfig.selectMapping?.[fieldType];
						} else {
							if (!zodafConfig.inputMapping?.[fieldType]) {
								throw new Error(
									`No component found for input fieldType: ${fieldType}. Please check your zodaf.config.ts file. ${schema.shape[key]._def.typeName}`
								);
							}
							Comp = zodafConfig.inputMapping?.[fieldType];
						}

						return (
							<Comp
								key={key}
								label={
									fieldsConfig[key]?.label ||
									schema.shape[key].description ||
									key
								}
								options={options}
								error={message} // Passer le message d'erreur comme chaîne de caractères
								register={register}
								name={key}
								required={!optionnal}
								formConfig={{
									showOptional,
									showRequired,
									showDescriptionOnError:
										showDescriptionOnError !== undefined
											? showDescriptionOnError
											: true,
								}}
								fieldConfig={fieldsConfig[key] || {}}
								{...fieldsConfig[key]?.props}
							/>
						);
					})}

				{Submit && !submitHidden && <Submit>{submitLabel}</Submit>}
			</form>
		);
	}
);

AutoFormBase.displayName = "AutoFormBase";

export { AutoFormBase };
