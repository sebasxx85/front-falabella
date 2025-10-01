export default {
  testEnvironment: "jsdom",
  // Trata .ts/.tsx como ESM para que babel-jest los procese bien en proyectos "type":"module"
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

  // Opcional, pero ayuda a que Jest solo busque tests donde queremos
  testMatch: ["<rootDir>/src/__tests__/**/*.test.js"],

  // Cobertura: incluir TS/JS y excluir definiciones y tipos
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/types/**",
    "!src/config/env.d.ts",
    "!vite-env.d.ts",
    "!src/main.*"
  ],
  // Para evitar que intente instrumentar archivos de tipos
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/types/",
    "src/config/env.d.ts",
    "vite-env.d.ts"
  ],
};
