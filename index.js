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

let componentName

const program = require('commander')
  .version(require('./package.json').version)
  .arguments('<component-directory>')
  .action(name => componentName = name)
  .option('-f, --fn', 'Create Function Component')
  .option('-c, --css', `Add ${componentName}.css`)
  .parse(process.argv)

createComponent(componentName)

function createComponent (name) {
  const rootDirectory = path.resolve(name)
  const hasCSS = program.css
  const makeFn = program.fn

  if (!fs.existsSync(rootDirectory)) {
    mkdirp.sync(rootDirectory)
  }

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
