var Base = require('../lib/module-base.js')
  , pluralize = require('pluralize')
  , path = require('path')

module.exports = Base.extend({
  constructor: function() {
    Base.apply(this, arguments)

    this.option('directive', {
      type: String,
      desc: "The name of your new directive"
    })

    this.option('collection', {
      desc: 'A collection to iterate over in your directive',
      type: String
    })

    this.option('model', {
      desc: 'A model to use with a given collection',
      type: String
    })

    this.option('hintHTML', {
      defaults: false,
      type: Boolean,
      hidden: true
    })
  },

  _setDirective: function(name) {
    this.directive = this._.camelize(name)
    this.directiveDashed = this._.dasherize(name)
    this.directiveTag = "<"+this.directiveDashed+"></"+this.directiveDashed+">"
    this.ctrlClass = this._.classify(name + ' ctrl')
  },

  init: function() {
    this.say("Let's create you a new directive!")
    this.pluralize = pluralize
    this.getModule(this.async())

    // Initing vars we'll use in our underscore template
    this.collection = undefined
    this.model = undefined

    if (this.options.collection) {
      this.collection = this._.classify(this.options.collection)
    }

    if (this.options.model) {
      this.model = this._.classify(this.options.model)
    }

    if (this.options.directive) {
      this._setDirective(this.options.directive)
    }
  },

  getName: function() {
    if (this.directive) { return; }

    var done = this.async()
      , self = this;

    this.ask("What's the name of your directive?", function(name) {
      self._setDirective(name)
      done()
    })
  },

  files: function() {
    var paths = this.config.get('paths')
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

