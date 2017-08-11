const getTemplate = require('./get-template')

module.exports = ReduxActionTypes

function ReduxActionTypes (rootDirectory, name, hasCSS) {
  return getTemplate(rootDirectory, 'actionTypes', hasCSS, 'actionTypes')
}
