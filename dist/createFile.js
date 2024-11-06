#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { existsSync, promises as fs } from "fs";
import ora from "ora";
import path from "path";
import readlineSync from "readline-sync";
// Fonction pour trouver la racine du projet
function findProjectRoot(startPath) {
    var currentDir = startPath;
    while (currentDir !== path.parse(currentDir).root) {
        if (existsSync(path.join(currentDir, "package.json"))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    throw new Error("package.json not found in any parent directory.");
}
// Fonction pour créer le fichier de configuration zodaf
function createZodafConfigFile() {
    return __awaiter(this, void 0, void 0, function () {
        var projectRoot, targetPath, answer, spinner, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projectRoot = findProjectRoot(process.cwd());
                    targetPath = path.join(projectRoot, "zodaf.config.ts");
                    if (existsSync(targetPath)) {
                        answer = readlineSync.question("Le fichier ".concat(targetPath, " existe d\u00E9j\u00E0. Voulez-vous l'\u00E9craser ? (y/n) [OUI par d\u00E9faut]: "));
                        if (answer.trim().toLowerCase() !== "y" && answer.trim() !== "") {
                            console.log("Le fichier n'a pas été écrasé.");
                            return [2 /*return*/];
                        }
                    }
                    spinner = ora("Cr\u00E9ation de ".concat(targetPath, "...")).start();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs.writeFile(targetPath, "import { ZodafConfig } from \"@zodaf/react\";\nimport { InputField } from \"./src/components/ui/zodaf/InputField\";\n\nexport const config: ZodafConfig = {\n\tmapping: {\n\t\tinput: InputField,\n\t},\n   // Add your configuration here\n}; ", "utf8")];
                case 2:
                    _a.sent();
                    spinner.succeed("Fichier de configuration zodaf.config.ts cr\u00E9\u00E9 avec succ\u00E8s.");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    spinner.fail("\u00C9chec de la cr\u00E9ation de ".concat(targetPath));
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Fonction pour créer le dossier de composants et les fichiers d'exemple
function createZodafComponentsDir() {
    return __awaiter(this, void 0, void 0, function () {
        var projectRoot, componentsConfigPath, componentsDir, componentsConfig, _a, _b, spinner, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    projectRoot = findProjectRoot(process.cwd());
                    componentsConfigPath = path.join(projectRoot, "components.json");
                    componentsDir = path.join(projectRoot, "src/components/ui/zodaf");
                    if (!existsSync(componentsConfigPath)) return [3 /*break*/, 2];
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, fs.readFile(componentsConfigPath, "utf8")];
                case 1:
                    componentsConfig = _b.apply(_a, [_c.sent()]);
                    if (componentsConfig.path) {
                        componentsDir = path.join(projectRoot, componentsConfig.path, "zodaf");
                    }
                    _c.label = 2;
                case 2:
                    if (!!existsSync(componentsDir)) return [3 /*break*/, 8];
                    spinner = ora("Cr\u00E9ation du dossier ".concat(componentsDir, "...")).start();
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, fs.mkdir(componentsDir, { recursive: true })];
                case 4:
                    _c.sent();
                    spinner.succeed("Dossier de composants cr\u00E9\u00E9 avec succ\u00E8s : ".concat(componentsDir));
                    // Création des fichiers d'exemple
                    return [4 /*yield*/, createExampleFiles(componentsDir)];
                case 5:
                    // Création des fichiers d'exemple
                    _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _c.sent();
                    spinner.fail("\u00C9chec de la cr\u00E9ation du dossier ".concat(componentsDir));
                    console.error(error_2);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.log("Le dossier ".concat(componentsDir, " existe d\u00E9j\u00E0."));
                    _c.label = 9;
                case 9: 
                // Crée les fichiers d'exemple après avoir vérifié le dossier
                return [4 /*yield*/, createExampleFiles(componentsDir)];
                case 10:
                    // Crée les fichiers d'exemple après avoir vérifié le dossier
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Fonction pour créer les fichiers d'exemple et les fichiers texte
function createExampleFiles(componentsDir) {
    return __awaiter(this, void 0, void 0, function () {
        var exampleFiles, spinner, _i, exampleFiles_1, _a, name_1, content, filePath, answer, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    exampleFiles = [
                        {
                            name: "InputField.tsx",
                            content: "import { ZodafELementProps } from \"@zodaf/react\";\n\nconst InputField: React.FC<ZodafELementProps> = ({\n\tname,\n\tlabel,\n\tregister,\n\terror,\n}) => {\n\treturn (\n\t\t<div className=\"mb-4\">\n\t\t\t<label htmlFor={name} className=\"block font-medium mb-1\">\n\t\t\t\t{label}\n\t\t\t</label>\n\t\t\t<input\n\t\t\t\tid={name}\n\t\t\t\t{...register(name)}\n\t\t\t\tclassName={`border px-3 py-2 w-full ${\n\t\t\t\t\terror ? \"border-red-500\" : \"border-gray-300\"\n\t\t\t\t} rounded`}\n\t\t\t/>\n\t\t\t{error && <p className=\"text-red-500 text-sm mt-1\">{error}</p>}\n\t\t</div>\n\t);\n};\n\nexport { InputField };\n",
                        },
                        {
                            name: "AutoForm.tsx",
                            content: "import { forwardRef } from \"react\";\nimport { AutoFormBase, AutoFormProps } from \"@zodaf/react\";\nimport { config } from \"../../../../zodaf.config\";\n\nexport const AutoForm = forwardRef<HTMLFormElement, AutoFormProps>(\n\t({ onSubmit, schema, fieldsConfig }, ref) => {\n\t\treturn (\n\t\t\t<AutoFormBase\n\t\t\t\tonSubmit={onSubmit}\n\t\t\t\tref={ref}\n\t\t\t\tschema={schema}\n\t\t\t\tconfig={config}\n\t\t\t\tfieldsConfig={fieldsConfig}\n\t\t\t/>\n\t\t);\n\t}\n);\n\nAutoFormBase.displayName = \"AutoFormBase\";\n\n",
                        },
                    ];
                    spinner = ora("Cr\u00E9ation des composants de base...").start();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    _i = 0, exampleFiles_1 = exampleFiles;
                    _b.label = 2;
                case 2:
                    if (!(_i < exampleFiles_1.length)) return [3 /*break*/, 5];
                    _a = exampleFiles_1[_i], name_1 = _a.name, content = _a.content;
                    filePath = path.join(componentsDir, name_1);
                    // Demande de confirmation avant d'écraser chaque fichier
                    if (existsSync(filePath)) {
                        answer = readlineSync.question("Le fichier ".concat(filePath, " existe d\u00E9j\u00E0. Voulez-vous l'\u00E9craser ? (y/n) [OUI par d\u00E9faut]: "));
                        if (answer.trim().toLowerCase() !== "y" &&
                            answer.trim() !== "") {
                            console.log("Le fichier ".concat(filePath, " n'a pas \u00E9t\u00E9 \u00E9cras\u00E9."));
                            return [3 /*break*/, 4];
                        }
                    }
                    return [4 /*yield*/, fs.writeFile(filePath, content, "utf8")];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    spinner.succeed("Composants de base cr\u00E9\u00E9s avec succ\u00E8s !");
                    return [3 /*break*/, 7];
                case 6:
                    error_3 = _b.sent();
                    spinner.fail("\u00C9chec de la cr\u00E9ation des fichiers d'exemple dans ".concat(componentsDir));
                    console.error(error_3);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
var args = process.argv.slice(2);
if (args.length > 0 && args[0] === "init") {
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createZodafConfigFile()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createZodafComponentsDir()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })();
}
else {
    console.log("Usage: npx @zodaf/react init");
}
