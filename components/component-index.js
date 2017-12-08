const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = ComponentIndex

function ComponentIndex (rootDirectory, name, techConfig) {
  const file = path.join(rootDirectory, techConfig.fileName)


  const body = fs
    .readFileSync(techConfig.template, 'utf-8')
    .split('Template')
    .join(toTitleCase(name))
    .split('template')
    .join(name)

  return fs.writeFileSync(file, body)
}
