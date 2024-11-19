import { defineConfig } from 'tsup'

export default defineConfig({
  bundle: true,
  cjsInterop: true,
  clean: false,
  dts: { entry: ['src/index.ts'] },
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  splitting: false,
  tsconfig: 'tsconfig.json',
})
