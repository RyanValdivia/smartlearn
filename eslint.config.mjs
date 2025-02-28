import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from "@stylistic/eslint-plugin-ts";

const skipLint = false;

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: { globals: globals.browser },
        plugins: {
            "@stylistic/ts": stylisticTs,
        },
        rules: {
            "@typescript-eslint/consistent-type-imports": skipLint
                ? "off"
                : [
                    "error",
                    {
                        prefer: "type-imports",
                        fixStyle: "inline-type-imports",
                    },
                ],
            "@typescript-eslint/no-unused-vars": skipLint
                ? "off"
                : ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "@typescript-eslint/no-explicit-any": skipLint ? "off" : "error",
            "custom-rules/no-object-concat": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@stylistic/ts/indent": ['error', 4],
            "react/react-in-jsx-scope": "off",
        }
    }
];