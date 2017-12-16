const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = ShallowRenderTest

function ShallowRenderTest (dir, name, techConfig) {
  let fileName = techConfig.fileName
  try {
    fileName = eval(fileName)
  } catch (e) {}
  const file = path.join(dir, fileName)

  const body = fs
    .readFileSync(techConfig.template, 'utf-8')
    .split('Template')
    .join(toTitleCase(name))
    .split('template')
    .join(name)

  return fs.writeFileSync(file, body)
}
