var Base = require('../lib/cpui-base.js')

module.exports = Base.extend({
  init: function() {
    var done = this.async()
      , self = this

    this.say("Let's build something cool")

    this.prompt([{
      type: 'list',
      name: 'generator',
      message: "What do you want to build today?",
      choices: [
        { value: 'cpui:scaffold',   name: 'A new app' },
        { value: 'cpui:model',      name: 'A new model' },
        { value: 'cpui:collection', name: 'A new collection' },
        { value: 'cpui:directive',  name: 'A new directive' },
        { value: 'cpui:controller', name: 'A new controller' },
        { value: 'cpui:route',      name: 'A new route' }
      ]
    }], function (props) {
      self.invoke(props.generator, {options: {mute: true}})
      done()
    })
  }
})

