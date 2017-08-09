const path = require('path')
const fs = require('fs')
const toTitleCase = require('titlecase')

module.exports = ShallowRenderTest

function ShallowRenderTest (rootDirectory, name) {
  const file = path.join(rootDirectory, `${name}.test.js`)
  const body = template(name)

  return fs.writeFileSync(file, body)
}

// pretty janky, but we want this whitespace to be reflected in the component.
function template (name) {
  const proper = toTitleCase(name)

  return `import React from 'react'
import { shallow } from 'enzyme'

import ${proper} from './${name}.js'

it('renders without props', () => {
  shallow(<${proper} />)
})
`
}
