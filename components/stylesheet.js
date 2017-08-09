const path = require('path')
const fs = require('fs')

module.exports = StyleSheet

const container = `.container {
}
`

function StyleSheet (rootDirectory, name) {
  return fs.writeFileSync(path.join(rootDirectory, 'style.css'), container)
}
