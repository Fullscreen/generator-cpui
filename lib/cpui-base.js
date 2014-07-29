var yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , path = require('path')
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

    // Import our config from bower.json
    this.cpui = this.dest.readJSON('bower.json').yoconfig

    // Set defaults for where to poop things on disk
    this.cpui.paths = _(this.cpui.paths).defaults({
      scripts: '/scripts',
      styles: '/stylesheets/sections',
      specs: ''
    });

    // update paths to use appPath
    _(this.cpui.paths).each(function(val, key, obj){
      var basePath = key == 'specs' ? this.cpui.specPath : this.cpui.appPath;
      obj[key] = path.join(basePath, val);
    }, this);
  },

  // Helper method to apply an optional angular namespace to a module name
  namespace: function(module) {
    return this.cpui.namespace + module
  },

  // Insert new content before a comment section in content
  prepend: function(content, section, newContent) {
    var placeholder = this.cpui.separators.pre + section
    return content.replace(placeholder, placeholder+"\n"+newContent)
  },

  // Insert new content after a comment section in content
  append: function(content, section, newContent) {
    var placeholder = this.cpui.separators.post + section
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
      message: message,
    }], function (props) {
      cb(props.varname)
    })
  }
})

