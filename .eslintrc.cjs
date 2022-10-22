module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
    plugins: ["vue", "eslint-plugin-html", "sort-imports-es6-autofix", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "import/prefer-default-export": 0,
        "no-throw-literal": 0,
        "prefer-const": 0,
        "no-console": 0,
        "no-prototype-builtins": 0,
        "security/detect-object-injection": 0,
        "no-var": 2,
        "no-undef": 2,
        "no-param-reassign": 2,
        "sort-imports-es6-autofix/sort-imports-es6": [
            "error",
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ["none", "single", "all", "multiple"],
            },
        ],
    },
};