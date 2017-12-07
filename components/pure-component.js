const getTemplate = require('./get-template')

module.exports = PureComponent

function PureComponent (rootDirectory, name, file, toImport) {
  return getTemplate(rootDirectory, name, toImport, 'pure-component', file)
}
