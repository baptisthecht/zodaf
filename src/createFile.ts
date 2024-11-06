#!/usr/bin/env node

import { existsSync, promises as fs } from "fs";
import ora from "ora";
import path from "path";
import readlineSync from "readline-sync";

// Fonction pour trouver la racine du projet
function findProjectRoot(startPath: string) {
	let currentDir = startPath;

	while (currentDir !== path.parse(currentDir).root) {
		if (existsSync(path.join(currentDir, "package.json"))) {
			return currentDir;
		}
		currentDir = path.dirname(currentDir);
	}

	throw new Error("package.json not found in any parent directory.");
}

// Fonction pour créer le fichier de configuration zodaf
async function createZodafConfigFile() {
	const projectRoot = findProjectRoot(process.cwd());
	const targetPath = path.join(projectRoot, "zodaf.config.ts");

	if (existsSync(targetPath)) {
		const answer = readlineSync.question(
			`Le fichier ${targetPath} existe déjà. Voulez-vous l'écraser ? (y/n) [OUI par défaut]: `
		);
		if (answer.trim().toLowerCase() !== "y" && answer.trim() !== "") {
			console.log("Le fichier n'a pas été écrasé.");
			return;
		}
	}
	const spinner = ora(`Création de ${targetPath}...`).start();
	try {
		await fs.writeFile(
			targetPath,
			`import { ZodafConfig } from "@zodaf/react";
import { InputField } from "./src/components/ui/zodaf/InputField";

export const config: ZodafConfig = {
	mapping: {
		input: InputField,
	},
   // Add your configuration here
}; `,
			"utf8"
		);
		spinner.succeed(
			`Fichier de configuration zodaf.config.ts créé avec succès.`
		);
	} catch (error) {
		spinner.fail(`Échec de la création de ${targetPath}`);
		console.error(error);
	}
}

// Fonction pour créer le dossier de composants et les fichiers d'exemple
async function createZodafComponentsDir() {
	const projectRoot = findProjectRoot(process.cwd());
	const componentsConfigPath = path.join(projectRoot, "components.json");

	let componentsDir = path.join(projectRoot, "src/components/ui/zodaf");

	// Vérifie si le fichier components.json existe et récupère le chemin spécifié
	if (existsSync(componentsConfigPath)) {
		const componentsConfig = JSON.parse(
			await fs.readFile(componentsConfigPath, "utf8")
		);
		if (componentsConfig.path) {
			componentsDir = path.join(
				projectRoot,
				componentsConfig.path,
				"zodaf"
			);
		}
	}

	// Crée le dossier de composants s'il n'existe pas déjà
	if (!existsSync(componentsDir)) {
		const spinner = ora(`Création du dossier ${componentsDir}...`).start();
		try {
			await fs.mkdir(componentsDir, { recursive: true });
			spinner.succeed(
				`Dossier de composants créé avec succès : ${componentsDir}`
			);

			// Création des fichiers d'exemple
			await createExampleFiles(componentsDir);
		} catch (error) {
			spinner.fail(`Échec de la création du dossier ${componentsDir}`);
			console.error(error);
		}
	} else {
		console.log(`Le dossier ${componentsDir} existe déjà.`);
	}

	// Crée les fichiers d'exemple après avoir vérifié le dossier
	await createExampleFiles(componentsDir);
}

// Fonction pour créer les fichiers d'exemple et les fichiers texte
async function createExampleFiles(componentsDir: string) {
	const exampleFiles = [
		{
			name: "InputField.tsx",
			content: `import { ZodafELementProps } from "@zodaf/react";

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
`,
		},
		{
			name: "AutoForm.tsx",
			content: `import { forwardRef } from "react";
import { AutoFormBase, AutoFormProps } from "@zodaf/react";
import { config } from "../../../../zodaf.config";

export const AutoForm = forwardRef<HTMLFormElement, AutoFormProps>(
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

`,
		},
	];

	const spinner = ora(`Création des composants de base...`).start();
	try {
		for (const { name, content } of exampleFiles) {
			const filePath = path.join(componentsDir, name);

			// Demande de confirmation avant d'écraser chaque fichier
			if (existsSync(filePath)) {
				const answer = readlineSync.question(
					`Le fichier ${filePath} existe déjà. Voulez-vous l'écraser ? (y/n) [OUI par défaut]: `
				);
				if (
					answer.trim().toLowerCase() !== "y" &&
					answer.trim() !== ""
				) {
					console.log(`Le fichier ${filePath} n'a pas été écrasé.`);
					continue;
				}
			}

			await fs.writeFile(filePath, content, "utf8");
		}
		spinner.succeed(`Composants de base créés avec succès !`);
	} catch (error) {
		spinner.fail(
			`Échec de la création des fichiers d'exemple dans ${componentsDir}`
		);
		console.error(error);
	}
}

const args = process.argv.slice(2);
if (args.length > 0 && args[0] === "init") {
	(async () => {
		await createZodafConfigFile();
		await createZodafComponentsDir();
	})();
} else {
	console.log("Usage: npx @zodaf/react init");
}
