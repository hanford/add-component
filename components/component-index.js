const Utilities = require("./utilities");

module.exports = ComponentIndex;

function ComponentIndex(rootDirectory, name) {
  Utilities.getIndex(rootDirectory, name);
}
