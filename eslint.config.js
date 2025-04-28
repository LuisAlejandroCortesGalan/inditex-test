import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  { ignores: ["dist", "**/*.d.ts"] },
  // Configuración específica para eslint.config.js
  {
    files: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        process: "readonly",
      },
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      prettier,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": ["error"],
      "import/no-extraneous-dependencies": "off",
      "no-undef": "off",
    },
  },
  // Configuración específica para jest.config.ts y setupTests.ts
  {
    files: ["jest.config.ts", "setupTests.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        process: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        project: null, // Deshabilitar type-aware linting
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "prettier/prettier": ["error"],
      "import/no-extraneous-dependencies": "off",
      "no-undef": "off",
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
        },
      },
    },
  },
  // Configuración para archivos .ts y .tsx
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        process: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.test.json"],
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      "prettier/prettier": ["error"],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "import/prefer-default-export": "off",
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json", "./tsconfig.test.json"],
        },
      },
    },
  },
  // Configuración para vite.config.ts
  {
    files: ["vite.config.ts"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        process: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        project: null,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "prettier/prettier": ["error"],
      "import/no-extraneous-dependencies": "off",
      "no-undef": "off",
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts"],
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
        },
      },
    },
  },
];