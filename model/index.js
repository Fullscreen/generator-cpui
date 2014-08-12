var Base = require('../lib/module-base.js')
  , path = require('path')

module.exports = Base.extend({
  constructor: function() {
    Base.apply(this, arguments)

    this.option('model', {
      type: String,
      desc: "The name of your new model"
    })
  },

  _setModel: function(name) {
    this.model = name
    this.modelClass = this._.classify(name)
  },

  init: function() {
    this.say("Let's create you a new model!")
    this.getModule(this.async())

    if (this.options.model) {
      this._setModel(this.options.model)
    }
  },

  getName: function() {
    if (this.model) { return }

    var done = this.async()
      , self = this

    this.ask("What's the name of your model?", function(model) {
      self._setModel(model)
      done()
    })
  },

  files: function() {
    var paths = this.config.get('paths')
      , modelPath = path.join(paths.scripts, this.module, 'models')
      , specPath = path.join(paths.specs, this.module, 'models')

    // Create model
    this.mkdir(modelPath)
    this.template('_model.coffee', path.join(modelPath, this.model+'.coffee'))

    // Create test
    this.mkdir(specPath)
    this.template('_test.coffee', path.join(specPath, this.model+'.coffee'))
  }
})
