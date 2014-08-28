var Base = require('../lib/cpui-base.js')
  , path = require('path')

module.exports = Base.extend({
  constructor: function() {
    Base.apply(this, arguments)

    this.option('module', {
      type: String,
      desc: "The name of your new module"
    })
  },

  init: function() {
    if (!this.configExists()) {
      this.createConfig(this.async())
    }
  },

  create: function () {
    this.say("Let's create you a new module!")

    if (this.options.module) {
      this.module = this.options.module
    }
  },

  // Prompt for the module name if it's not specified
  getModuleName: function() {
    if (this.module) { return }

    var done = this.async()
      , self = this

    this.prompt([{
      type: 'input',
      name: 'module',
      message: "What's the name of your module?"
    }], function (props) {
      self.module = props.module
      done()
    })
  },

  files: function() {
    var paths = this.config.get('paths')
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
    var appCoffee = path.join(this.config.get('paths').scripts, 'app.coffee')
      , contents = this.readFileAsString(appCoffee)

    // Inject our module dependencies
    contents = this.append(contents, "Requiring our modules", "#= require "+this.module)
    contents = this.append(contents, "Our modules", "  '"+this.namespace(this.module)+"'")

    this.dest.write(appCoffee, contents)
  },

  addTestsToKarma: function() {
    var testFiles = 'karma.files.json'
      , files = JSON.parse(this.readFileAsString(testFiles))

    files.modules.push(this.module)
    this.dest.write(testFiles, JSON.stringify(files, null, 2))
  }
})
