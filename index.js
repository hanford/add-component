#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const chalk = require('chalk')

const ComponentIndex = require('./components/component-index')
const PureComponent = require('./components/pure-component')
const StyleSheet = require('./components/stylesheet')
const StyledComponents = require('./components/styled-components')
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
  .option('-d, --directory <directory>', 'Use directory')
  .option('--no-index', 'Without index file')
  .option('-c, --css [css]', 'Add styling')
  .parse(process.argv)

createComponent(componentName)

function createComponent (name) {
  const rootDirectory = program.directory ? path.join(path.resolve(program.directory), name) : path.resolve(name)
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

  let toImport = [];

  switch (hasCSS) {
    case 'styled-components':
      toImport = toImport.concat(StyledComponents(rootDirectory, name).toImport)
      break
    case true:
      toImport = toImport.concat(StyleSheet(rootDirectory).toImport)
      break
  }

  let componentFilePath
  if (program.index) {
    componentFilePath = path.join(rootDirectory, name + '.js')
    ComponentIndex(rootDirectory, name)
  } else {
    componentFilePath = path.join(rootDirectory, 'index.js')
  }

  if (makeFn) {
    FunctionComponent(rootDirectory, name, componentFilePath, toImport)
  } else {
    PureComponent(rootDirectory, name, componentFilePath, toImport)
  }

  ShallowRender(rootDirectory, name)

  console.log(chalk.green(`Component ${chalk.blue.underline.bold(name)} created`))
}


function StoreGen (name, rootDirectory) {
  ReduxActions(rootDirectory, name)
  ReduxActionTypes(rootDirectory, name)
  ReduxReducer(rootDirectory, name)
}
