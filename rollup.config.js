/**
 * @type {import('rollup').RollupOptions}
 */
import pkg from "./package.json" assert { type: "json" };

import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const isProduction = process.env.NODE_ENV === "production";

const defaultOutput = {
  chunkFileNames: "pa/aaguids-[hash].js",
  esModule: true,
  exports: "auto",
  generatedCode: "es2015",
  indent: false,
  interop: "compat",
  sourcemap: "inline",
  validate: true,
};

export default defineConfig({
  perf: true,
  logLevel: isProduction ? "silent" : "info",
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      ...defaultOutput,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      ...defaultOutput,
    },
    {
      file: "dist/index.js",
      format: "module",
      ...defaultOutput,
    },
  ],
  external: Object.keys(pkg.dependencies),
  plugins: [nodeResolve(), commonjs(), json(), typescript(), terser()],
});
