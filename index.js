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
  .option('--config [config]', 'Custom configuration')
  .parse(process.argv)

const config = getConfig(program.config);

function getConfig (customConfigPath) {
  // get default config
  const defaultConfig = require('./config.js')

  let customConfig = {}
  if (customConfigPath) {
    customConfig = require(path.resolve(customConfigPath))
  }

  let commonConfig =  Object.assign(defaultConfig, customConfig)

  // adjust config according to given options

  // remove CSS technologies if they are not needed
  if (!program.css) {
    Object.keys(commonConfig.techs).forEach(function(techName) {
      if (techName === 'css' || commonConfig.techs[techName].cliOption === 'css') {
        delete commonConfig.techs[techName]
      }
    })
  } else if (program.css === true) {
    // leave only original CSS technology
    Object.keys(commonConfig.techs).forEach(function(techName) {
      if (commonConfig.techs[techName].cliOption === 'css') {
        delete commonConfig.techs[techName]
      }
    })
  } else {
    // leave only specific CSS technology
    Object.keys(commonConfig.techs).forEach(function(techName) {
      if (techName === 'css') {
        delete commonConfig.techs[techName]
      } else if (techName !== program.css && commonConfig.techs[techName].cliOption === 'css') {
        delete commonConfig.techs[techName]
      }
    })
  }

  // rewrite directory
  if (program.directory) {
    commonConfig.directory = program.directory
  }

  return commonConfig
}

createComponent(componentName)

function createComponent (name) {
  const rootDirectory = path.join(path.resolve(config.directory), name)
  const makeFn = program.fn
  const createStore = program.store

  if (!fs.existsSync(rootDirectory)) {
    mkdirp.sync(rootDirectory)
  }

  if (createStore) {
    return StoreGen(name, rootDirectory)
  }
  ComponentGen(name, rootDirectory, makeFn, config)
}

function ComponentGen (name, rootDirectory, makeFn, config) {

  function TechGen (techConfig) {
    if (techConfig.generator) {
      const generator = require(techConfig.generator)
      const generated = generator(rootDirectory, name, techConfig)
      if (generated && generated.toImport) {
        toImport = toImport.concat(generated.toImport)
      }
    }
  }

  let toImport = [],
      lastToGenerate

  Object.keys(config.techs).forEach(function(techName) {
    const tech = config.techs[techName]
    if (tech.last) {
      // generate it later TODO
      lastToGenerate = tech
      return
    } else {
      TechGen(tech)
    }
  });

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
