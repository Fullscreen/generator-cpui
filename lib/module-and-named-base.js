var Base = require('./module-base')
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
  }
});
