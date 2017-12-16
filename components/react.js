const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = getTemplate

function getTemplate (dir, name, techConfig, toImport) {
  let fileName = techConfig.fileName
  try {
    fileName = eval(fileName)
  } catch (e) {}
  const file = path.join(dir, fileName)

  const importCode = toImport.join('\n')

  const body = fs
    .readFileSync(techConfig.template, 'utf-8')
    .split('Template')
    .join(toTitleCase(name))
    .split('// Imports')
    .join(importCode)

  return fs.writeFileSync(file, body)
}
