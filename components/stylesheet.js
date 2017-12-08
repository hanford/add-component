const path = require('path')
const fs = require('fs')

module.exports = StyleSheet

function StyleSheet (dir, name, techConfig) {
  const file = path.join(dir, techConfig.fileName)

  const body = fs.readFileSync(techConfig.template, 'utf-8')

  fs.writeFileSync(file, body)

  return {
    toImport: [ `import style from './${techConfig.fileName}'` ]
  }
}
