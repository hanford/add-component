const path = require('path')

module.exports = {
/*  techsToGen: [
    'styled-components',
    'react',
    'redux-reducer',
  ],*/
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
    },
    'index': {
      generator: './components/component-index',
      template: path.resolve(__dirname, './templates/index.js'),
      fileName: 'index.js'
    },
    'react': {
      generator: './components/react',
      template: path.resolve(__dirname, './templates/pure-component.js'),
      functionalTemplate: path.resolve(__dirname, './templates/functional-component.js'),
      fileName: '`${name}.js`',
      last: true
    },
    'shallow': {
      generator: './components/shallow-render',
      template: path.resolve(__dirname, './templates/test.js'),
      fileName: '`${name}.test.js`',
    },
    'storybook': {
      generator: './components/storybook',
      template: path.resolve(__dirname, './templates/storybook.js'),
      fileName: '`${name}.stories.js`',
    },
    'redux-actions': {
      generator: './components/redux-actions',
      template: path.resolve(__dirname, './templates/action.js'),
      fileName: 'action.js',
    },
    'redux-actiontypes': {
      generator: './components/redux-actionTypes',
      template: path.resolve(__dirname, './templates/actionTypes.js'),
      fileName: 'actionTypes.js',
    },
    'redux-reducer': {
      generator: './components/redux-reducer',
      template: path.resolve(__dirname, './templates/reducer.js'),
      fileName: 'reducer.js',
    }
  },
  directory: './'
}
