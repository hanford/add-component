const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = ComponentIndex

function ComponentIndex (rootDirectory, name) {
  const file = path.join(rootDirectory, `index.js`)
  const body = template(name)

  return fs.writeFileSync(file, body)
}

// pretty janky, but we want this whitespace to be reflected in the component.
function template (name) {
  const proper = toTitleCase(name)

  return `import ${proper} from './${name}.js'

export default ${proper}
`
}
