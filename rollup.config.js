import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/pure-handlers.ts',
    output: [
      {
        file: pkg.exports['.'],
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ include: ['src/pure-handlers.ts'] })],
  },
  {
    input: 'src/pure-handlers.ts',
    output: [
      {
        file: './dist/browser/pure-handlers.browser.min.js',
        format: 'umd',
        exports: 'named',
        sourcemap: true,
        name: 'PureHandlers',
      },
    ],
    plugins: [typescript({ include: ['src/pure-handlers.ts'], declaration: false }), terser()],
  },
  {
    input: 'src/react/react.ts',
    output: [
      {
        file: pkg.exports['./react'],
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: './src/react' })],
    external: ['react', 'react-dom', '../pure-handlers'],
    onwarn(warning) {
      if (/is not under 'rootDir'/.test(warning.message)) {
        return
      }

      console.error(warning)
    },
  },
]
