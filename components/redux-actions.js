const getTemplate = require('./get-template')

module.exports = ReduxActions

function ReduxActions (rootDirectory, name, hasCSS) {
  return getTemplate(rootDirectory, 'actions', hasCSS, 'action')
}
