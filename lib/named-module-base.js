var Base = require('./cpui-base')
  , path = require('path')
  , yosay = require('yosay')

/**
 * Copy of the Yeoman `NamedBase` extending off of CPUI base
 */
module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);

    // Define the module name as a mandatory argument
    this.argument('module', {
      desc: "The name of your new module",
      required: true,
      type: String
    })

  }
})

