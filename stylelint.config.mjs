/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-html', 'stylelint-prettier'],
  rules: {
    'block-no-empty': true,
    'color-function-notation': ['modern'],
  },
};
