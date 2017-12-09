const path = require('path')
const fs = require('fs')

module.exports = ReduxReducer

function ReduxReducer (dir, name, techConfig) {
  let fileName = techConfig.fileName
  try {
    fileName = eval(fileName)
  } catch (e) {}
  const file = path.join(dir, fileName)

  const body = fs
    .readFileSync(techConfig.template, 'utf-8')

  return fs.writeFileSync(file, body)
}
