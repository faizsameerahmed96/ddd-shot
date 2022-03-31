module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "google",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "quotes": ["warn", "double"],
        "linebreak-style": 0,
        "quote-props": ["warn", "consistent-as-needed"],
        "@typescript-eslint/explicit-function-return-type": 1,
        "valid-jsdoc": [
            "error",
            {
                requireParamType: false,
                requireReturnType: false,
                requireReturn: false
            },
        ],
    },
}
