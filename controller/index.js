var Base = require('../lib/module-base.js')
  , _ = require('underscore')
  , path = require('path')

module.exports = Base.extend({
  constructor: function() {
    Base.apply(this, arguments)

    this.option('controller', {
      type: String,
      desc: "The name of your new controller"
    })
  },

  init: function() {
    if (!this.configExists()) {
      this.createConfig(this.async())
    }
  },

  create: function () {
    this.say("Let's create you a new controller!")
    this.getModule(this.async())

    this.ctrlFile = undefined
    this.ctrlClass = undefined

    if (this.options.controller) {
      this._setController(this.options.controller)
    }
  },

  _setController: function (name) {
    this.ctrlFile  = this._.dasherize(name)
    this.ctrlClass = this._.classify(name + ' ctrl')
  },

  getName: function() {
    if (this.ctrlClass) { return }

    var done = this.async()
      , self = this

    this.ask("What's the name of your controller?", function(name) {
      self._setController(name)
      done()
    })
  },

  files: function() {
    var paths = this.config.get('paths')
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
