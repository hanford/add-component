#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const chalk = require('chalk')

const ComponentIndex = require('./components/component-index')
const PureComponent = require('./components/pure-component')
const StyleSheet = require('./components/stylesheet')
const ShallowRender = require('./components/shallow-render')
const FunctionComponent = require('./components/function-component')

const ReduxActions = require('./components/redux-actions.js')
const ReduxActionTypes = require('./components/redux-actionTypes.js')
const ReduxReducer = require('./components/redux-reducer.js')

let componentName

const program = require('commander')
  .version(require('./package.json').version)
  .arguments('<component-directory>')
  .action(name => componentName = name)
  .option('-f, --fn', 'Create Function Component')
  .option('-r, --redux', 'Create Redux Store')
  .option('-c, --css', `Add ${componentName}.css`)
  .parse(process.argv)

createComponent(componentName)

function createComponent (name) {
  const rootDirectory = path.resolve(name)
  const hasCSS = program.css
  const makeFn = program.fn
  const createStore = program.store

  if (!fs.existsSync(rootDirectory)) {
    mkdirp.sync(rootDirectory)
  }

  if (createStore) {
    return StoreGen(name, rootDirectory)
  }
  ComponentGen(name, rootDirectory, hasCSS, makeFn)
}

function ComponentGen (name, rootDirectory, hasCSS, makeFn) {
  if (hasCSS) {
    StyleSheet(rootDirectory)
  }

  if (makeFn) {
    FunctionComponent(rootDirectory, name, hasCSS)
  } else {
    PureComponent(rootDirectory, name, hasCSS)
  }

  ComponentIndex(rootDirectory, name)
  ShallowRender(rootDirectory, name)

  console.log(chalk.green(`Component ${chalk.blue.underline.bold(name)} created`))
}


function StoreGen (name, rootDirectory) {
  ReduxActions(rootDirectory, name)
  ReduxActionTypes(rootDirectory, name)
  ReduxReducer(rootDirectory, name)
}
