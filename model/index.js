var yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , path = require('path')
  , CPUI = require('../lib/cpui-base')

module.exports = yeoman.generators.Base.extend({
  init: function() {
    // Inherit our base class
    CPUI.extend(this)

    this.argument('module', {
      desc: "The module we'll be adding your model to",
      type: String,
      required: true
    })

    this.argument('model', {
      desc: "The name of your new model",
      type: String,
      required: true
    })

    try {
      this.dest.read(path.join(this.cpui.paths.scripts, this.module, 'index.coffee'))
      this.log(yosay("Let's create you a new model!"))
    } catch(e) {
      this.log(yosay("Oops! Looks like you haven't created a \""+this.module+"\" module yet!"))
      this.log("Run `yo cpui "+this.module+"` to create the module and try again!")
      process.exit(1)
    }
  },

  files: function() {
    var paths = this.cpui.paths
      , modelPath = path.join(paths.scripts, this.module, 'models')
      , specPath = path.join(paths.specs, this.module, 'models')

    this.modelClass = this._.classify(this.model)

    // Create model
    this.mkdir(modelPath)
    this.template('_model.coffee', path.join(modelPath, this.model+'.coffee'))

    // Create test
    this.mkdir(specPath)
    this.template('_test.coffee', path.join(specPath, this.model+'.coffee'))
  }
})
