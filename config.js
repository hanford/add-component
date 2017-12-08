const path = require('path')

module.exports = {
  techs: {
    'styled-components': {
      generator: './components/styled-components',
      template: path.resolve(__dirname, './templates/styled-components.js'),
      fileName: 'styles.js',
      cliOption: 'css'
    },
    'css': {
      generator: './components/stylesheet',
      template: path.resolve(__dirname, './templates/style.css'),
      fileName: 'style.css'
    }
  },
  directory: './'
}
