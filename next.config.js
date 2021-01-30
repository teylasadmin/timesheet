// deafult
const withCSS = require("@zeit/next-css");

// default Config
// module.exports = withCSS({});


// Custom Config
module.exports = withCSS({
  cssModules: true
})
