import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/pure-handlers.ts',
    output: [
      {
        file: pkg.exports['.'].import,
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
        file: pkg.exports['.'].require,
        format: 'cjs',
        exports: 'default',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ include: ['src/pure-handlers.ts'], declaration: false })],
  },
  {
    input: 'src/pure-handlers.ts',
    output: [
      {
        file: pkg.exports['./browser'],
        format: 'umd',
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
        file: pkg.exports['./react'].import,
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: './src/react' })],
    external: ['react', 'react-dom', '../pure-handlers.js'],
    onwarn(warning) {
      if (/is not under 'rootDir'/.test(warning.message)) {
        return
      }

      console.error(warning)
    },
  },
  {
    input: 'src/react/react.ts',
    output: [
      {
        file: pkg.exports['./react'].require,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: './src/react', declaration: false })],
    external: ['react', 'react-dom', '../pure-handlers.js'],
    onwarn(warning) {
      if (/is not under 'rootDir'/.test(warning.message)) {
        return
      }

      console.error(warning)
    },
  },
]
