const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = getTemplate

function getTemplate (dir, name, toImport, templateName, file) {
  const file = path.join(dir, `${name}.js`)

  const templateLocation = `../templates/${templateName}.js`

  const importCode = toImport.join('\n')

  const body = fs
    .readFileSync(path.join(__dirname, templateLocation), 'utf-8')
    .split('Template')
    .join(toTitleCase(name))
    .split('// Imports')
    .join(importCode)

  return fs.writeFileSync(file, body)
}
