import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const baseConfigs = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

// Convert all rule severities to "warn"
const convertRulesToWarn = (config) => {
  if (!config.rules) return config;
  const newRules = {};
  for (const [rule, value] of Object.entries(config.rules)) {
    if (Array.isArray(value)) {
      newRules[rule] = ["warn", ...value.slice(1)];
    } else if (typeof value === "string" || typeof value === "number") {
      newRules[rule] = "warn";
    } else {
      newRules[rule] = value;
    }
  }
  return { ...config, rules: newRules };
};

const eslintConfig = baseConfigs.map(convertRulesToWarn);

export default eslintConfig;
