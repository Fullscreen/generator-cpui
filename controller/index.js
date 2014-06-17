var NamedBase = require('../lib/module-and-named-base.js')
  , path = require('path')

module.exports = NamedBase.extend({
  init: function() {
    this.say("Let's create you a new controller!")
    this.ctrlFile  = this._.dasherize(this.name)
    this.ctrlClass = this._.classify(this.name + ' controller')
  },

  files: function() {
    var paths = this.cpui.paths
      , ctrlPath = path.join(paths.scripts, this.module, 'controllers')
      , specPath = path.join(paths.specs, this.module, 'controllers')

    // Create model
    this.mkdir(ctrlPath)
    this.template('_controller.coffee', path.join(ctrlPath, this.ctrlFile+'.coffee'))

    // Create test
    this.mkdir(specPath)
    this.template('_test.coffee', path.join(specPath, this.ctrlFile+'.coffee'))
  }
})

