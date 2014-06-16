var yeoman = require('yeoman-generator')
  , _ = require('underscore')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // Import our config from bower.json
    this.cpui = this.dest.readJSON('bower.json').yoconfig

    // Figure out where to poop things on disk
    this.cpui.paths = {
      scripts: this.cpui.appPath+'/scripts',
      styles: this.cpui.appPath+'/stylesheets/sections',
      specs: this.cpui.specPath
    }
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
  }
})

