const Utilities = require("./utilities");

module.exports = PureComponent;

function PureComponent(rootDirectory, name, hasCSS) {
  return Utilities.getTemplate(
    rootDirectory,
    name,
    hasCSS,
    "functional-component"
  );
}
