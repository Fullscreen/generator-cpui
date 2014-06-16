var NamedBase = require('../lib/module-and-named-base.js')
  , yosay = require('yosay')
  , path = require('path')

module.exports = NamedBase.extend({
  init: function() {
    this.log(yosay("Let's create you a new collection!"))
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
