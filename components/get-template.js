const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = getTemplate

function getTemplate (dir, name, css, templateName) {
  const file = path.join(dir, `${name}.js`)

  const templateLocation = css
    ? `../templates/${templateName}-css.js`
    : `../templates/${templateName}.js`

  const body = fs
    .readFileSync(path.join(__dirname, templateLocation), 'utf-8')
    .split('Template')
    .join(toTitleCase(name))

  return fs.writeFileSync(file, body)
}
