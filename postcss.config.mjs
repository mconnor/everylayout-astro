import postcssJitProps from 'postcss-jit-props'
import path from 'path'
import autoprefixer from 'autoprefixer'
import postcssNesting from 'postcss-nesting'
import postcssPow from 'postcss-pow'

export default {
  plugins: [
    postcssJitProps({
      files: [
        path.resolve(
          process.cwd(),
          'node_modules/open-props/dist/open-props.min.css',
        ),
      ],
    }),
    autoprefixer,
    postcssNesting,
    postcssPow,
  ],
}
