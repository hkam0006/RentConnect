module.exports = {
  setupFiles: ['./jest.polyfills.js'],
  transformIgnorePatterns: [
    "./node_modules/(?!(d3-shape|d3-[a-z-]+)/)", // Transform d3-shape and related d3 modules
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use babel-jest for transforming files
  },
  setupFilesAfterEnv: ["./setupTests.js"], 
}