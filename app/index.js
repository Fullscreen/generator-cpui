var Base = require('../lib/cpui-base.js')
    , _ = require('underscore')
    , done = undefined
    , yo = undefined

module.exports = Base.extend({
  init: function() {
    yo = this
    done = this.async()
    yo.buildSomething()
  },

  buildSomething: function () {

    var noConfig = _.isEmpty(yo.config.getAll())
    if (noConfig) {
      var message = "Let's not get ahead of ourselves. Let's make you a " +
          "config first."
      yo.say(message)
      yo.invoke('cpui:bootstrap', {options: {mute: true}})
    }
    else {
      yo.say("Let's build something cool")

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

      yo.prompt(question, function (props) {
        yo.invoke(props.generator, {options: {mute: true}})
      })
    }
  }
})