var Base = require('../lib/cpui-base.js')
  , _ = require('underscore')

module.exports = Base.extend({
  checkConfig: function() {
    if (!this.configExists()) {
      this.createConfig(this.async())
    }
  },

  init: function () {
    this.say("Let's build something cool")

    var self = this
      , question = {
          type: 'list',
          name: 'generator',
          message: "What do you want to build today?",
          choices: [
            { value: 'cpui:scaffold',   name: 'A new app' },
            { value: 'cpui:model',      name: 'A new model' },
            { value: 'cpui:collection', name: 'A new collection' },
            { value: 'cpui:directive',  name: 'A new directive' },
            { value: 'cpui:controller', name: 'A new controller' },
            { value: 'cpui:route',      name: 'A new route' },
            { value: 'cpui:bootstrap',  name: 'A new config file' }
          ]
        }

    this.prompt(question, function (props) {
      self.invoke(props.generator, {options: {mute: true}})
    })
  }
})
