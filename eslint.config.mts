import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "src/views/resources/**",
      "./migrations/**",
      "./seeders/**",
    ],
  },
  {
    ignores: ["**/*.min.js"],
    files: ["**/*.{js,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "error",
    },
  },
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
]);
