import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "import/order": ["error", {
        groups: [
          "builtin",   // node:fs, path, etc.
          "external",  // package.json dependencies
          ["internal", "parent", "sibling", "index"], // relative imports
        ],
        // New lines between groups
        "newlines-between": "always",
        // Keep alphabetical ordering inside groups
        "alphabetize": { order: "asc", caseInsensitive: true },

        // Customization of groups
        "pathGroups": [
          // Intra-Monorepo deps: @feed/** after external
          { pattern: "@feed/**", group: "external", position: "after" },
          // Internal aliases: @/** (ex: "@/lib/...")
          { pattern: "@/**", group: "internal", position: "before" },
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
      }],

      // Évite les imports dupliqués
      "import/no-duplicates": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ]
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
