var NamedBase = require('../lib/module-and-named-base.js')
  , pluralize = require('pluralize')
  , path = require('path')

module.exports = NamedBase.extend({
  init: function() {
    this.say("Let's create you a new directive!")

    // Initing vars we'll use in our underscore template
    this.collection = undefined
    this.model = undefined

    this.option('collection', {
      desc: 'A collection to iterate over in your directive',
      defaults: false
    })

    this.option('model', {
      desc: 'A model to use with a given collection',
      defaults: false
    })

    this.option('hintHTML', {
      defaults: false,
      hidden: true
    })

    if (this.options.collection) {
      this.collection = this._.classify(this.options.collection)
    }

    if (this.options.model) {
      this.model = this._.classify(this.options.model)
    }

    this.pluralize = pluralize
    this.directive = this._.camelize(this.name)
    this.directiveDashed = this._.dasherize(this.name)
    this.directiveTag = "<"+this.directiveDashed+"></"+this.directiveDashed+">"
  },

  files: function() {
    var paths = this.cpui.paths
      , directivePath = path.join(paths.scripts, this.module, 'directives')
      , tmplPath = path.join(paths.scripts, this.module, 'templates')
      , specPath = path.join(paths.specs, this.module, 'directives')

    // Create model
    this.mkdir(directivePath)
    this.template('_directive.coffee', path.join(directivePath, this.directiveDashed+'.coffee'))

    // Create test
    this.mkdir(tmplPath)
    this.template('_directive.html', path.join(tmplPath, this.directiveDashed+'.html'))

    // Create test
    this.mkdir(specPath)
    this.template('_test.coffee', path.join(specPath, this.directiveDashed+'.coffee'))
  }
})

