const getTemplate = require('./get-template')

module.exports = PureComponent

function PureComponent (rootDirectory, name, toImport, file) {
  return getTemplate(rootDirectory, name, toImport, 'functional-component', file)
}
