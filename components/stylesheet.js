const path = require('path')
const fs = require('fs')

module.exports = StyleSheet

function StyleSheet (rootDirectory) {
  const templateLocation = '../templates/style.css'
  const body = fs.readFileSync(path.join(__dirname, templateLocation), 'utf-8')

  fs.writeFileSync(path.join(rootDirectory, 'style.css'), body)
}
