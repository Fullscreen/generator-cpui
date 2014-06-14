var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  init: function() {
    var config = this.dest.readJSON('bower.json').yoconfig
      , self = this

    // Figure out where to poop things on disk
    this.paths = {
      scripts: config.appPath+'/scripts',
      styles: config.appPath+'/stylesheets',
      specs: config.specPath
    }

    // And what module should we require?
    this.rootModule = config.rootModule

    this.sep = config.separators
    this.ns = config.namespace

    // Create a git-addable directory
    this.makeKeep = function (path) {
      this.mkdir(path)
      this.copy('gitkeep', path+'/.gitkeep')
    }

    this.argument('module', {
      desc: "The name of your new module",
      required: false,
      type: 'string'
    })

    this.log(yosay("Let's create you a new module!"))
  },


  askFor: function() {
    if (this.module) { return }

    var done = this.async()
      , self = this

    this.prompt({
      message: "What are we calling your new module?",
      name: 'module',
      required: true,
      type: 'input'
    }, function(resp) {
      self.args[0] = resp.module
      done()
    })
  },

  createStubFiles: function() {
    this.makeKeep(this.paths.scripts +'/'+ this.module)
    this.makeKeep(this.paths.specs +'/'+ this.module)
    this.makeKeep(this.paths.styles +'/'+ this.module)
    this.template('_index.coffee', this.paths.scripts +'/'+ this.module + '/index.coffee')
    this.copy('empty.scss', this.paths.styles +'/'+ this.module + '/index.scss')
  },

  // Inject our `fs.module` entry into the dependencies
  // for the main CPUI app
  rewriteAppCoffee: function() {
    var appCoffee = this.paths.scripts + '/app.coffee'
      , contents = this.readFileAsString(appCoffee)
      , self = this

    function inject(str, section) {
      var placeholder = self.sep.post+section
        , newContent = str + "\n" + placeholder
      return contents.replace(placeholder, newContent)
    }

    // Inject our module dependencies
    contents = inject("#= require "+this.module, "Requiring our modules")
    contents = inject("  '"+this.ns+this.module+"'", "Our modules")

    this.dest.write(appCoffee, contents)
  }
});
