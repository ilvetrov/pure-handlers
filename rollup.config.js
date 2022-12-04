import sass from 'rollup-plugin-sass'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'umd',
        exports: 'named',
        sourcemap: true,
        strict: false,
        name: 'PureHandlers',
      },
    ],
    plugins: [sass({ insert: true }), typescript(), terser()],
  },
  {
    input: 'src/react.ts',
    output: [
      {
        file: pkg.exports.react,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [sass({ insert: true }), typescript(), terser()],
    external: ['react', 'react-dom'],
  },
]
