# add-component

Generate the component boilerplate, CSS, and a shallow render test with one line.

## Install

Run

```npm install -g add-component```

## Usage

```
# Generate PureComponent and shallow render test
$ add-component ${name}

# Generate PureComponent and shallow render test with stylesheet
$ add-component ${name} -c

# Generate Functional Component and shallow render test with stylesheet
$ add-component ${name} -c -f

# Generate a full redux store
$ add-component ${name} --redux
```

## Example


#### Component

```sh
add-component example -c
```
Generates `example` folder with the following:

`index.js`
```js
import Example from './example.js'

export default Example
```

`style.css`
```css
.container {}
```

`example.js`
```js
import React, { PureComponent } from 'react'

import style from './style.css'

class Example extends PureComponent {
  render () {
    return (
      <div className={style.container}>test</div>
    )
  }
}

export default Example
```

`example.test.js`
```js
import React from 'react'
import { shallow } from 'enzyme'

import Example from './example.js'

it('renders without props', () => {
  shallow(<Example />)
})
```

#### Redux Store

```sh
add-component count --redux
```
Generates `count` folder with the following:

`actions.js`
```js
import t from './actionTypes.js'

export function increment () {
  return {
    type: t.INCREMENT
  }
}
```

`actionTypes.js`
```js
export default {
  INCREMENT: 'INCREMENT'
}
```

`reducer.js`
```js
import t from './actionTypes'

const defaultState = {
  count: 0,
}

const score = (state = defaultState, action) => {
  switch (action.type) {

    case t.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }

    default:
      return state
  }
}

export default users


```

## Additional options

```
# Define directory with components
$ add-react-component -d src Example

# Creates component with styled-components as styling solution
$ add-react-component -c styled-components Example

# Does not use summary index.js but puts component into it
$ add-react-component --no-index Example
```

## Configuration

You can define all the options in configuration file. Also, with configuration, you can redefine technology
generators, technology templates and filenames. Look into `config.js` to find out what cat be setted.

```
# Run with configuration
$ add-react-component --config .add-component/config.js Example

# Example of configuration
$ cat .add-component/config.js

const path = require('path')

module.exports = {
  techsToGen: [
    'styled-components',
    'react',
    'storybook',
  ],
  techs: {
    'react': {
      fileName: 'index.js'
    },
   'storybook': {
      template: path.resolve(__dirname, './storybook-template.js')
    }
  },
  directory: './src',
}
```

## License

MIT © [Jack Hanford](http://jackhanford.com)
