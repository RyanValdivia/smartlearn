import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

const skipLint = false;

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: { globals: globals.browser },
        plugins: { "@stylistic": stylistic },
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
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
            "@typescript-eslint/no-explicit-any": skipLint ? "off" : "error",
            "custom-rules/no-object-concat": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@stylistic/indent": ["error", 4],
            "react/react-in-jsx-scope": "off",
            "@stylistic/semi": ["error", "always"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/comma-dangle": ["error", "always-multiline"],
            "@stylistic/quote-props": "off",
            "@stylistic/function-call-argument-newline": [
                "error",
                "consistent",
            ],
            "@stylistic/jsx-indent": ["error", 4],
            "@stylistic/jsx-indent-props": ["error", 4],
            "@stylistic/jsx-curly-spacing": ["error", "never"],
            "@stylistic/object-curly-newline": [
                "error",
                {
                    ObjectExpression: { multiline: true },
                    ObjectPattern: { multiline: true },
                    ImportDeclaration: "never",
                    ExportDeclaration: { multiline: true, minProperties: 3 },
                },
            ],
            "function-paren-newline": ["error", "consistent"],
            "object-curly-newline": [
                "error",
                { multiline: true, consistent: true },
            ],
        },
    },
    prettier,
    ...pluginQuery.configs["flat/recommended"],
];
