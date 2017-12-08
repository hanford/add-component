const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = getTemplate

function getTemplate (dir, name, techConfig, toImport) {
  const file = path.join(dir, eval(techConfig.fileName))

  const importCode = toImport.join('\n')

  const body = fs
    .readFileSync(techConfig.template, 'utf-8')
    .split('Template')
    .join(toTitleCase(name))
    .split('// Imports')
    .join(importCode)

  return fs.writeFileSync(file, body)
}
