import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const skipLint = false;

const eslintConfig = [
  {
    languageOptions: {
      parser: await import("@typescript-eslint/parser"),
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": await import("@typescript-eslint/eslint-plugin"),
      "custom-rules": await import("eslint-plugin-custom-rules"),
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
    },
  },
];

export default eslintConfig;
