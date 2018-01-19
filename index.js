#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const deepmerge = require('deepmerge')

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

const config = getConfig(program.config)

function getConfig (customConfigPath) {

  // get default config
  const defaultConfig = require('./config.js')

  let customConfig = {}
  if (customConfigPath) {
    customConfig = require(path.resolve(customConfigPath))
  } else if (fs.existsSync(path.resolve('./.add-component/config.js'))) {
    customConfig = require(path.resolve('./.add-component/config.js'))
  }

  let commonConfig =  deepmerge(defaultConfig, customConfig)

  // to not overwrite the list of technologies
  if (customConfig.techsToGen && customConfig.techsToGen.indexOf('*') === -1) {
   commonConfig.techsToGen = customConfig.techsToGen
  }

  // adjust config according to given options

  // define techs to generate by default
  if (!commonConfig.techsToGen) {
    commonConfig.techsToGen = Object.keys(commonConfig.techs)

  }

  // include redux technologies if there was no option
  if (program.redux) {
    if (commonConfig.techsToGen.indexOf('redux-actions') === -1) {
      commonConfig.techsToGen.push('redux-actions')
    }
    if (commonConfig.techsToGen.indexOf('redux-actiontypes') === -1) {
      commonConfig.techsToGen.push('redux-actiontypes')
    }
    if (commonConfig.techsToGen.indexOf('redux-reducer') === -1) {
      commonConfig.techsToGen.push('redux-reducer')
    }
  }

  // remove CSS technologies if they are not needed
  // do not remove if they are specified in config
  if (!program.css) {
    // do nothing
  }
  else if (program.css === 'css' || program.css === true) {
    // leave only original CSS technology
    if (commonConfig.techsToGen.indexOf('css') === -1) {
      commonConfig.techsToGen.push('css')
    }
    Object.keys(commonConfig.techs).forEach(function (techName) {
      if (commonConfig.techs[techName].cliOption === 'css'  && commonConfig.techsToGen.indexOf(techName) !== -1) {
        commonConfig.techsToGen.splice(commonConfig.techsToGen.indexOf(techName), 1)
      }
    })
  } else {
    // leave only specific CSS technology
    if (commonConfig.techsToGen.indexOf(program.css) === -1) {
      commonConfig.techsToGen.push(program.css)
    }
    Object.keys(commonConfig.techs).forEach(function (techName) {
      if (techName === 'css' && commonConfig.techsToGen.indexOf('css') !== -1) {
        commonConfig.techsToGen.splice(commonConfig.techsToGen.indexOf('css'), 1)
      } else if (techName !== program.css && commonConfig.techs[techName].cliOption === 'css' && commonConfig.techsToGen.indexOf(techName) !== -1) {
        commonConfig.techsToGen.splice(commonConfig.techsToGen.indexOf(techName), 1)
      }
    })
  }

  // filter out technologies
  if (commonConfig.techsToGen) {
    Object.keys(commonConfig.techs).forEach(function (techName) {
      if (commonConfig.techsToGen.indexOf(techName) === -1) {
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
  })

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
