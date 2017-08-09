const Utilities = require("./utilities");

module.exports = ShallowRenderTest;

function ShallowRenderTest(rootDirectory, name) {
  return Utilities.getTest(rootDirectory, name);
}
