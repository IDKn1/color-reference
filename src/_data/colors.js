const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  let url = "https://n-s.work/api/colors";
  return Fetch(url, {
    requestId: "colorCODES",

    // Optional: cache duration
    duration: "10s", // or "1h", "10m", etc.

    type: "json",
  });
};
