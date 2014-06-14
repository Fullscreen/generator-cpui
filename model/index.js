var NamedBase = require('../lib/module-and-named-base.js')
  , yosay = require('yosay')
  , path = require('path')

module.exports = NamedBase.extend({
  init: function() {
    this.log(yosay("Let's create you a new model!"))
    this.model = this.name
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
