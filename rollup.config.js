import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const typescriptOptions = {
  tsconfigOverride: {
    compilerOptions: {
      module: 'es2015',
    },
  },
};

export default [
  // UMD (Development)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/webln.js',
      format: 'umd',
      name: 'WebLN',
    },
    plugins: [typescript(typescriptOptions)],
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
      typescript(typescriptOptions),
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