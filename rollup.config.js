/**
 * @type {import('rollup').RollupOptions}
 */
import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  perf: true,
  logLevel: 'info',
  input: 'index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript(),
    terser(),
  ],
});
