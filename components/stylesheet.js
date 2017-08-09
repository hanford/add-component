const Utilities = require("./utilities");

module.exports = StyleSheet;

function StyleSheet(rootDirectory) {
  return Utilities.getStyles(rootDirectory);
}
