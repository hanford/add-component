const getTemplate = require('./get-template')

module.exports = ReduxReducer

function ReduxReducer (rootDirectory, name) {
  return getTemplate(rootDirectory, 'reducer', false, 'reducer')
}
