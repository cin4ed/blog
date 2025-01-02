import globals from "globals";
import js from "@eslint/js";
import json from "@eslint/json";
import ts from "typescript-eslint";
// import astro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier/recommended";
import markdown from "@eslint/markdown";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["node_modules", ".astro", "dist", ".vscode"] },
  ...markdown.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
    },
  },
  {
    files: ["**/*.json"],
    ignores: ["**/package-lock.json"],
    language: "json/json",
    ...json.configs.recommended,
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    ...js.configs.recommended,
  },
  ...ts.configs.recommended,
  prettier,
  // ...astro.configs.recommended,
];
