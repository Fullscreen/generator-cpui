var yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , path = require('path')
  , fs = require('fs')
  , _ = require('underscore')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // Provide a hidden mute option so we can mute sub generators when invoking
    // them externally
    this.option('mute', {
      type: Boolean,
      defaults: false,
      hide: true
    })
  },

  // Helper method to apply an optional angular namespace to a module name
  namespace: function(module) {
    return this.config.get('namespace') + module
  },

  // Insert new content before a comment section in content
  prepend: function(content, section, newContent) {
    var placeholder = this.config.get('separators').pre + section
    return content.replace(placeholder, placeholder+"\n"+newContent)
  },

  // Insert new content after a comment section in content
  append: function(content, section, newContent) {
    var placeholder = this.config.get('separators').post + section
    return content.replace(placeholder, newContent+"\n"+placeholder)
  },

  say: function(message) {
    if (this.options.mute) { return }
    this.log(yosay(message))
  },

  ask: function(message, cb) {
    var done = this.async()
      , self = this

    this.prompt([{
      type: 'input',
      name: 'varname',
      message: message
    }], function (props) {
      cb(props.varname)
    })
  }
})
