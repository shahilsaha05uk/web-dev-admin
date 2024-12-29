// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    organizeImportsSkipDestructiveCodeActions: true,
    printWidth: 120, // max 120 chars in line, code is easy to read
    useTabs: false, // use spaces instead of tabs
    singleQuote: true, // '' for stings instead of ""
    bracketSpacing: true, // import { some } ... instead of import {some} ...
    arrowParens: "always", // braces even for single param in arrow functions (a) => { }
    jsxSingleQuote: false, // "" for react props, like in html
    bracketSameLine: false, // pretty JSX
    endOfLine: "lf", // 'lf' for linux, 'crlf' for windows, we need to use 'lf' for git
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
        "^(api|assets|modules|utils|core|core_components|auth|booking|home|services|addon|user)(/.*)$", // Specific aliases
        "^[.]", // Relative imports
        "^(?!.*[.]css$)[./].*$", // Other relative imports (non-CSS)
        ".css$", // CSS imports
    ],
};
export default config;
