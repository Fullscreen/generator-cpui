var Base = require('../lib/module-base.js')
  , Bootstrap = require('../bootstrap')
  , _ = require('underscore')
  , path = require('path')
  , self = undefined
  , done = undefined

console.log('test', Bootstrap.extend({}))

module.exports = Bootstrap.extend({
  constructor: function() {
    Base.apply(this, arguments)

    this.option('controller', {
      type: String,
      desc: "The name of your new controller"
    })
  },

  init: function() {
    self = this
    done = this.async()

//    console.log('config exists', self.configExists())

    self._create()
  },

  _create: function () {
    self.say("Let's create you a new controller!")
    self.getModule(done)

    if (self.options.controller) {
      self._setController(self.options.controller)
    }
  },

  _setController: function(name) {
    this.ctrlFile  = this._.dasherize(name)
    this.ctrlClass = this._.classify(name + ' ctrl')
  },

  getName: function() {
    if (this.ctrlClass) { return }

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