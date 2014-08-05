var Base = require('./cpui-base')
  , path = require('path')
  , yosay = require('yosay')

/**
 * Copy of the Yeoman `NamedBase` class with two required args instead of one
 * Also alerts and quits if the required module is missing
 */
module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);

    if (this.options.module) { this.module = this.options.module }

    this.option('module', {
      type: String,
      desc: "A module to use"
    })
  },

  // High level `find_or_create` module method
  getModule: function(done) {
    var self = this;

    if (this.module) {
      this.createModule()
      done()
    } else {
      this.getModuleName(function(module) {
        self.module = module
        self.createModule(done)
      })
    }
  },

  // Prompt for the module name if it's not specified
  getModuleName: function(cb) {
    var self = this

    this.prompt([{
      type: 'input',
      name: 'module',
      message: "What's the name of your module?",
    }], function (props) {
      cb(props.module)
    })
  },

  // Call out to `cpui:module` if needed
  createModule: function(cb) {
    if (this.moduleExists()) {
      cb()
      return
    }
    this.invoke('cpui:module', {options: {mute: true, module: this.module}}, cb)
  },

  moduleExists: function() {
    try {
      this.dest.read(path.join(this.config.get('paths').scripts, this.module, 'index.coffee'))
      return true
    } catch(e) {
      return false
    }
  }
});
