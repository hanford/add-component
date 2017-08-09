const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = FunctionComponent

function FunctionComponent (rootDirectory, name, hasCSS) {
  const file = path.join(rootDirectory, `${name}.js`)
  const body = hasCSS ? templateWithCSS(name) : templateWithoutCSS(name)

  return fs.writeFileSync(file, body)
}

// pretty janky, but we want this whitespace to be reflected in the component.
function templateWithCSS (name) {
  const proper = toTitleCase(name)

  return `import React from 'react'

import style from './style.css'

export default function ${proper} (props) {
  return (
    <div className={style.container}>${name}</div>
  )
}
`
}

// pretty janky, but we want this whitespace to be reflected in the component.
function templateWithoutCSS (name) {
  return `import React from 'react'

export default function ${name} (props) {
  return (
    <div>${name}</div>
  )
}
`
}
