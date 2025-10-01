export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    // Mock para estilos importados en JS: import './style.css'
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  // Si el código usa rutas relativas simples, no hace falta más.
  // Si hay path aliases, mapearlos aquí con moduleNameMapper.
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/main.*",      // opcional: excluir bootstrap principal
  ],
};
