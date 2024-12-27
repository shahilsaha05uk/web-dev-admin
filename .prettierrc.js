// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: "all",
    tabWidth: 4,
    semi: true,
    importOrderTypeScriptVersion: "5.0.0",
    importOrderParserPlugins: ["typescript", "jsx"],
    importOrderSeparation: true,
    importOrder: [
        "^react$", // React imports
        "@mui/(.*)$", // MUI imports
        "<THIRD_PARTY_MODULES>", // Other third-party libraries
        "^(api|assets|modules|router|utils|core|core_components|auth|booking|home|services|addon|user)(/.*)$", // Specific aliases
        "^[.]", // Relative imports
        "^(?!.*[.]css$)[./].*$", // Other relative imports (non-CSS)
        ".css$", // CSS imports
    ],
};

export default config;
