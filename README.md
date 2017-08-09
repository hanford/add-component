# add-react-component

Generate the component boilerplate, CSS, and a shallow render test with one line.

## Install

Run

```npm install -g add-react-component```

## Usage

```
# Generate PureComponent and shallow render test
$ add-react-component

# Generate PureComponent and shallow render test with stylesheet
$ add-react-component -c

# Generate Functional Component and shallow render test with stylesheet
$ add-react-component -c -f
```

## Example

```sh
add-react-component example -c
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

## License

MIT © [Jack Hanford](http://jackhanford.com)
