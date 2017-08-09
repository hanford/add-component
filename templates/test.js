import React from 'react'
import { shallow } from 'enzyme'

import Template from './template.js'

it('renders without props', () => {
  shallow(<Template />)
})
