import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const skipLint = false;

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "plugin:@typescript-eslint/recommended"),
  {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      tsconfigRootDir: __dirname,
    },
    plugins: ["@typescript-eslint", "custom-rules"],
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
      "custom-rules/no-prisma-enums": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-empty-interface": "off",
    },
  },
];

export default eslintConfig;
