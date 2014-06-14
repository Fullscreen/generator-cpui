var yeoman = require('yeoman-generator')
  , _ = require('underscore')

function CPUI() {
  if ( ! (this instanceof yeoman.generators.Base)) {
    throw new Error("CPUI must be extended off of the Base Yeoman generator!")
  }

  // Import our config from bower.json
  this.cpui = this.dest.readJSON('bower.json').yoconfig

  // Figure out where to poop things on disk
  this.cpui.paths = {
    scripts: this.cpui.appPath+'/scripts',
    styles: this.cpui.appPath+'/stylesheets/sections',
    specs: this.cpui.specPath
  }
}

// Helper method to apply an optional angular namespace to a module name
CPUI.prototype.namespace = function(module) {
  return this.cpui.namespace + module
}

// Insert new content before a comment section in content
CPUI.prototype.prepend = function(content, section, newContent) {
  var placeholder = this.cpui.separators.pre + section
  return content.replace(placeholder, placeholder+"\n"+newContent)
}

// Insert new content after a comment section in content
CPUI.prototype.append = function(content, section, newContent) {
  var placeholder = this.cpui.separators.post + section
  return content.replace(placeholder, newContent+"\n"+placeholder)
}

// Helper method to extend an existing class instance
CPUI.extend = function(klass) {
  CPUI.call(klass)
  _.extend(klass.constructor.prototype, CPUI.prototype);
}

module.exports = CPUI

