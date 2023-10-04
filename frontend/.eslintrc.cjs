module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-strongly-recommended",
  ],
  rules: {
    "vue/html-indent": "off",
    "vue/require-default-prop": "off",
    "vue/html-self-closing": "off",
    "vue/html-closing-bracket-spacing": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/no-unused-vars": "error",
    "vue/max-attributes-per-line": "off"
  },
};
