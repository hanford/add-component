const path = require('path')

module.exports = {
  techs: {
    'styled-components': {
      generator: './components/styled-components',
      template: './templates/styled-components',
      cliOption: 'css'
    },
    'css': {
      generator: './components/stylesheet',
      template: './templates/stylesheet.css'
    }
  },
  directory: './'
}
