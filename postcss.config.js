import postcssJitProps from 'postcss-jit-props';
import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';
import postcssPow from 'postcss-pow';
import postcssImport from 'postcss-import';
import OpenProps from 'open-props';
// Use process.env.NODE_ENV to check if the environment is production
// const isProd = import.meta.env.PROD
// const isDev = import.meta.env.DEV

export default {
  plugins: [
    postcssImport,
    postcssJitProps(OpenProps),
    autoprefixer,
    postcssNesting,
    postcssPow,
  ],
};
// Use process.env.NODE_ENV to check if the environment is production
