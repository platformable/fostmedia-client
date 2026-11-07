// Used only by the pre-commit hook (lint-staged): blocks stray console calls
// without failing commits on unrelated pre-existing lint errors.
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    linterOptions: { reportUnusedDisableDirectives: "off" },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
];
