var NamedBase = require('../lib/module-and-named-base.js')
  , path = require('path')

module.exports = NamedBase.extend({
  init: function() {
    this.say("Let's create you a new collection!")

    // Initing vars we'll use in our underscore template
    this.model = undefined

    this.option('model', {
      desc: 'A model to require for this collection',
      defaults: false
    })

    if (this.options.model) {
      this.model = this._.classify(this.options.model)
    }

    this.collection = this.name
    this.collectionClass = this._.classify(this.collection)
  },

  files: function() {
    var paths = this.cpui.paths
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
