const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = StyledComponents

function StyledComponents (dir, name, techConfig) {
  let fileName = techConfig.fileName
  try {
    fileName = eval(fileName)
  } catch (e) {}
  const file = path.join(dir, fileName)

  const body = fs
    .readFileSync(techConfig.template, 'utf-8')
    .split('Template')
    .join(toTitleCase(name))

  fs.writeFileSync(file, body)

  return {
    toImport: [ `import * as s from './${techConfig.fileName}'` ]
  }
}
