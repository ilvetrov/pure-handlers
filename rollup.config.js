import { readFileSync, writeFileSync } from 'fs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

writeFileSync('./dist/package.json', readFileSync('./package.json'))

export default [
  {
    input: 'src/pure-handlers.ts',
    output: [
      {
        file: './dist/pure-handlers.js',
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
    input: 'src/react/index.ts',
    output: [
      {
        file: './dist/react/index.js',
        format: 'es',
        exports: 'named',
        sourcemap: false,
      },
    ],
    plugins: [typescript({ rootDir: './src/react', sourceMap: false, inlineSources: false })],
    external: ['react', 'react-dom', '../pure-handlers'],
    onwarn(warning) {
      if (/is not under 'rootDir'/.test(warning.message)) {
        return
      }

      console.error(warning)
    },
  },
]
