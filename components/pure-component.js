const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = PureComponent

function PureComponent (rootDirectory, name, hasCSS) {
  const file = path.join(rootDirectory, `${name}.js`)
  const body = hasCSS ? templateWithCSS(name) : templateWithoutCSS(name)

  return fs.writeFileSync(file, body)
}

// pretty janky, but we want this whitespace to be reflected in the component.
function templateWithCSS (name) {
  const proper = toTitleCase(name)

  return `import React, { PureComponent } from 'react'

import style from './style.css'

class ${proper} extends PureComponent {
  render () {
    return (
      <div className={style.container}>${name}</div>
    )
  }
}

export default ${proper}
`
}

// pretty janky, but we want this whitespace to be reflected in the component.
function templateWithoutCSS (name) {
  return `import React, { PureComponent } from 'react'

class ${name} extends PureComponent {
  render () {
    return (
      <div>${name}</div>
    )
  }
}

export default ${name}
`
}
