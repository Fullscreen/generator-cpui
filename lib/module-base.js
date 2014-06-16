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

    this.argument('module', {
      desc: "The name of your new module",
      type: String,
      required: true
    })
  }
});
