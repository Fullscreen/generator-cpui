var Base = require('../lib/cpui-base.js')
  , _ = require('underscore')
  , self = undefined
  , done = undefined

module.exports = Base.extend({
  init: function () {
    self = this
    done = this.async
    
//    var noConfig = _.isEmpty(this.config.getAll())
//    if (noConfig) {
//      var message = "Let's not get ahead of ourselves. We need to make you a " +
//          "config file first. (.yo-rc.json)"
//      this.say(message)
//      this.invoke('cpui:bootstrap', {options: {mute: true}})
//    }
//    else {
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
//    }
  }
})