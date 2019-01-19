import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default [
  // UMD (Development)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/webln.js',
      format: 'umd',
      name: 'WebLN',
    },
    plugins: [typescript()],
  },
  // UMD (Production)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/webln.min.js',
      format: 'umd',
      name: 'WebLN',
      indent: false,
    },
    plugins: [
      typescript(),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
]