/* eslint-disable */
export default {
    moduleNameMapper: {
      // Jest cannot understand this swiper import so we tell it where this points to
      "swiper/css": "swiper/swiper.min.css",
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    coverageDirectory: "../../coverage/libs/components",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transformIgnorePatterns: ["node_modules/(?!swiper|ssr-window|dom7)"],
  };