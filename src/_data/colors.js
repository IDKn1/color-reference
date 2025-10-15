const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  return Fetch(
    async function () {
      console.log("⚙️ Generating color data...");
      // Simulate an expensive operation or local computation
      let colors = {
        red: {},
        orange: {
          1: { colorCode: "fe4e2a" },
          2: { colorCode: "fd6e01" },
          3: { colorCode: "fe370f" },
          4: { colorCode: "ff4900" },
          5: { colorCode: "ff4e2b" },
          6: { colorCode: "f4320b" },
        },
        yellow: {
          1: { colorCode: "ffb700" },
        },
        green: {
          1: { colorCode: "223c36" },
          2: { colorCode: "174a43" },
        },
        blue: {
          1: { colorCode: "0196d0" },
          2: { colorCode: "2259fe" },
          3: { colorCode: "2851a1" },
          4: { colorCode: "085ccc" },
        },
        purple: {},
      };
      return colors;
    },
    {
      // Required: unique cache key
      requestId: "colorCODES",

      // Optional: cache duration
      duration: "10s", // or "1h", "10m", etc.

      type: "json",
    },
  );
};
