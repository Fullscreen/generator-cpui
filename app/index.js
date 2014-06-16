var Base = require('../lib/cpui-base')
  , yosay = require('yosay')
  , path = require('path')

module.exports = Base.extend({
  init: function() {
    this.log(yosay("Let's create you a new directive!"))
    this.model = this.name

    this.config.save(); // Save a yo-rc.json in the project root
  },

  files: function() {
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
