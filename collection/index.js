var Base = require('../lib/module-base.js')
  , path = require('path')
  , self = undefined

module.exports = Base.extend({
  constructor: function() {
    Base.apply(this, arguments)

    this.option('collection', {
      type: String,
      desc: "The name of your new collection"
    })
  },

  init: function() {
    self = this

    if (self.configExists()) self._create()
    else self.createConfig()
  },

  _create: function () {
    this.say("Let's create you a new collection!")
    this.getModule(this.async())

    // Initing vars we might use in our underscore template
    this.model = undefined
    if (this.options.model) { this.model = this._.classify(this.options.model) }

    if (this.options.collection) {
      this._setCollection(this.options.collection)
    }
  },

  _setCollection: function(name) {
    this.collection = name
    this.collectionClass = this._.classify(this.collection)
  },

  getName: function() {
    if (this.collection) { return }

    var done = this.async()
      , self = this

    this.ask("What's the name of your collection?", function(name) {
      self._setCollection(name)
      done()
    })
  },

  files: function() {
    var paths = this.config.get('paths')
      , collectionPath = path.join(paths.scripts, this.module, 'collections')
      , specPath = path.join(paths.specs, this.module, 'collections')

    // Create model
    this.mkdir(collectionPath)
    this.template('_collection.coffee', path.join(collectionPath, this.collection+'.coffee'))

    // Create test
    this.mkdir(specPath)
    this.template('_test.coffee', path.join(specPath, this.collection+'.coffee'))
  }
})
