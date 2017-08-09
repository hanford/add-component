const getTemplate = require('./get-template')

module.exports = PureComponent

function PureComponent (rootDirectory, name, hasCSS) {
  return getTemplate(rootDirectory, name, hasCSS, 'pure-component')
}
