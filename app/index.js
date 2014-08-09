var Base = require('../lib/cpui-base.js')
  , _ = require('underscore')
  , self = undefined

module.exports = Base.extend({
  init: function () {
    self = this

    this.say("Let's build something cool")

    var question = {
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