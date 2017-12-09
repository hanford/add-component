#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const deepmerge = require('deepmerge')

const ShallowRender = require('./components/shallow-render')

//const ReduxActionTypes = require('./components/redux-actionTypes.js')
//const ReduxReducer = require('./components/redux-reducer.js')

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

  let commonConfig =  deepmerge(defaultConfig, customConfig)

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

  if (program.fn) {
   // make functional component
   if (commonConfig.techs['react']) {
     commonConfig.techs['react'].template = commonConfig.techs['react'].functionalTemplate
   }
  }

  // change main file to index or not
  if (!program.index) {
    commonConfig.techs['react'].fileName = 'index.js'
    delete commonConfig.techs['index']
  }

  return commonConfig
}

createComponent(componentName)

function createComponent (name) {
  const rootDirectory = path.join(path.resolve(config.directory), name)
  const createStore = program.store

  if (!fs.existsSync(rootDirectory)) {
    mkdirp.sync(rootDirectory)
  }

  if (createStore) {
    return StoreGen(name, rootDirectory)
  }
  ComponentGen(name, rootDirectory, config)
}

function ComponentGen (name, rootDirectory, config) {

  function TechGen (techConfig) {
    if (techConfig.generator) {
      const generator = require(techConfig.generator)
      const generated = generator(rootDirectory, name, techConfig, toImport)
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
      // generate it later
      lastToGenerate = tech
      return
    } else {
      TechGen(tech)
    }
  });

  if (lastToGenerate) {
    TechGen(lastToGenerate)
  }

  console.log(chalk.green(`Component ${chalk.blue.underline.bold(name)} created`))
}


function StoreGen (name, rootDirectory) {
  ReduxActions(rootDirectory, name)
  ReduxActionTypes(rootDirectory, name)
  ReduxReducer(rootDirectory, name)
}
