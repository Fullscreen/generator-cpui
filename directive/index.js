var NamedBase = require('../lib/module-and-named-base.js')
  , yosay = require('yosay')
  , path = require('path')

module.exports = NamedBase.extend({
  init: function() {
    this.log(yosay("Let's create you a new directive!"))

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

