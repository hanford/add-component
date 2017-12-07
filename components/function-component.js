const getTemplate = require('./get-template')

module.exports = PureComponent

function PureComponent (rootDirectory, name, hasCSS, file) {
  return getTemplate(rootDirectory, name, hasCSS, 'functional-component', file)
}
