const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = StyledComponents

function StyledComponents (dir, name, techConfig) {
  const file = path.join(dir, techConfig.fileName)

  const body = fs
    .readFileSync(techConfig.template, 'utf-8')
    .split('Template')
    .join(toTitleCase(name))

  fs.writeFileSync(file, body)

  return {
    toImport: [ `import * as s from './${techConfig.fileName}'` ]
  }
}
