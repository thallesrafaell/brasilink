import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended"
  ),
  {
    ignores: [
      "build/",
      "dist/",
      ".next/",
      "out/",
      ".turbo/",
      "node_modules/",
      "src/components/ui/", // <--- IGNORE OS COMPONENTES DO SHADCN UI AQUI
      // Você pode ser mais específico se necessário, ex: "src/components/ui/sonner.tsx"
    ],
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-unresolved": [
        "error",
        {
          commonjs: true,
          amd: true,
          ignore: ["^@/", "^~/", "\\.css$", "\\.scss$", "\\.sass$", "\\.less$"],
        },
      ],
      "import/named": "error",
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
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
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
];

export default eslintConfig;
