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

    this.argument('name', {
      desc: "The name of thing we're creating",
      type: String,
      required: true
    })

    try {
      this.dest.read(path.join(this.cpui.paths.scripts, this.module, 'index.coffee'))
    } catch(e) {
      this.log(yosay("Oops! Looks like you haven't created a \""+this.module+"\" module yet!"))
      this.log("Run `yo cpui "+this.module+"` to create the module and try again!")
      process.exit(1)
    }
  }
});
