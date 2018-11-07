module.exports = {
    "extends": [
        "plugin:vue/recommended",
        "airbnb-base",
    ],
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
    "rules": {
        "quotes": ["error", "double", { "avoidEscape": true }],
        "indent": ["error", 4],
        "no-new": 0,
        "quote-props": ["error", "consistent"],
        "vue/html-indent": ["error", 4],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "always",
                "normal": "always",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        "max-len": ["error", { "code": 500, }],
        "no-use-before-define": ["error", { "functions": false, "classes": false }],
        "no-param-reassign": ["error", { "props": false }],
    },
    "globals": {
        "window": true,
        "chrome": true,
        "jwplayer": true,
        "location": true,
        "ga": true,
        "axios": true,
    },
    "parserOptions": {
        "sourceType": "module",
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "root": true,
};
