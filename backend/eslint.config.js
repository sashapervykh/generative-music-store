import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs["recommended"],
  {
    files: ["**/*.{js,ts}"],
    ignores: ["**/*.js", "dist/**/*", "node_modules/**/*"],
    rules: {
      "unicorn/better-regex": "warn",
      "unicorn/no-process-exit": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
  {
    files: ["src/**/*.test.{js,ts}"],
  },
  eslintPluginPrettierRecommended,
]);
