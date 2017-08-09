const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = ShallowRenderTest

function ShallowRenderTest (rootDirectory, name) {
  const file = path.join(rootDirectory, `${name}.test.js`)
  const templateLocation = '../templates/test.js'

  const body = fs
    .readFileSync(path.join(__dirname, templateLocation), 'utf-8')
    .split('Template')
    .join(toTitleCase(name))
    .split('template')
    .join(name)

  return fs.writeFileSync(file, body)
}
