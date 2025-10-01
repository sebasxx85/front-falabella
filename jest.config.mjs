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

  // Solo buscar tests dentro de src/__tests__/
  testMatch: ["<rootDir>/src/__tests__/**/*.test.js"],

  // Cobertura: incluir TS/JS y excluir lo que no queremos medir
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/types/**",
    "!src/config/env.d.ts",
    "!vite-env.d.ts",
    "!src/main.*",
    "!src/counter.ts",         // ignora boilerplate de Vite
    "!src/config/config.ts",   // ignora archivo de config con import.meta.env
    "!src/services/githubApi.ts", // ignora servicio externo
    "!src/utils/fetchJson.ts"  // ignora helper de fetch
  ],

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/types/",
    "src/config/env.d.ts",
    "vite-env.d.ts"
  ],
};
