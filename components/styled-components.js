const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = StyledComponents

function StyledComponents (dir, name) {
  const filePath = 'styles.js'
  const file = path.join(dir, filePath)

  const templateLocation = '../templates/styled-components.js'
  const body = fs
    .readFileSync(path.join(__dirname, templateLocation), 'utf-8')
    .split('Template')
    .join(toTitleCase(name))

  fs.writeFileSync(file, body)

  return {
    toImport: [ `import * as s from './${filePath}'` ]
  }
}
