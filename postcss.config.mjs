import autoprefixer from 'autoprefixer';
import OpenProps from 'open-props';
import postcssImport from 'postcss-import';
import postcssJitProps from 'postcss-jit-props';
import postcssNesting from 'postcss-nesting';
import postcssPow from 'postcss-pow';
// Use process.env.NODE_ENV to check if the environment is production
// const isProd = import.meta.env.PROD
// const isDev = import.meta.env.DEV

export default {
  plugins: [
    postcssImport,
    postcssJitProps({ ...OpenProps, custom_selector: ':global' }),
    autoprefixer,
    postcssNesting,
    postcssPow,
  ],
};
