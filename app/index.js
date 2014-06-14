var yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , path = require('path')
  , CPUI = require('../lib/cpui-base')

module.exports = yeoman.generators.Base.extend({
  init: function() {

    // Inherit our base class
    CPUI.extend(this)

    this.argument('module', {
      desc: "The name of your new module",
      required: false,
      type: String
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

  createFiles: function() {
    var paths = this.cpui.paths

    // Module directory
    this.mkdir(path.join(paths.scripts, this.module))
    this.template('_index.coffee', path.join(paths.scripts, this.module, 'index.coffee'))

    // Stylesheets
    this.mkdir(path.join(paths.specs, this.module))
    this.copy('gitkeep', path.join(paths.specs, this.module, '.gitkeep'))

    // Stylesheets
    this.mkdir(path.join(paths.styles, this.module))
    this.copy('empty.scss', path.join(paths.styles, this.module, 'index.scss'))
  },

  // Inject our `fs.module` entry into the dependencies
  // for the main CPUI app
  rewriteAppCoffee: function() {
    var appCoffee = path.join(this.cpui.paths.scripts, 'app.coffee')
      , contents = this.readFileAsString(appCoffee)

    // Inject our module dependencies
    contents = this.append(contents, "Requiring our modules", "#= require "+this.module)
    contents = this.append(contents, "Our modules", "  '"+this.namespace(this.module)+"'")

    this.dest.write(appCoffee, contents)
  }
});
