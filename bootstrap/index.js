var Base = require('../lib/cpui-base.js')
  , _ = require('underscore')
  , self = null
  , done = null
  , _defaults = null

module.exports = Base.extend({
  constructor: function() {
    Base.apply(this, arguments)
  },

  init: function () {

    self = this
    _defaults = this.src.readJSON('../../config.json')
    self.createConfig()
  },

  configExists: function () {
    var config = this.config.getAll()

    // TODO do more than just checking for the existence of _any_ config item
    return (_.isEmpty(config)) ? false : true
  },

  createConfig: function () {
    done = this.async()
    var message = ""

    if (self.configExists()) {
      message = "You have a config file already, but let's just make " +
        "a new one anyway."
      self.say(message)
    }
    else {
      message = "Let's not get ahead of ourselves. We need to make you a " +
        "config file first. (.yo-rc.json)"
      self.say(message)
    }

    var questions = [
      {
        type: 'input',
        name: 'rootModule',
        default: _defaults.rootModule,
        message: "What's the name of your root Angular module?"
      },
      {
        type: 'input',
        name: 'namespace',
        default: _defaults.namespace,
        message: "What namespace do you want to prefix your module names with?"
      },
      {
        type: 'input',
        name: 'paths:scripts',
        default: _defaults.paths.scripts,
        message: "Where are your javascript files?"
      },
      {
        type: 'input',
        name: 'paths:styles',
        default: _defaults.paths.styles,
        message: "Where are your stylesheets?"
      },
      {
        type: 'input',
        name: 'paths:specs',
        default: _defaults.paths.specs,
        message: "Where are your test files?"
      }
    ]
    this.prompt(questions, self.handleConfigAnswers)
  },

  /**
   * Some of our keys will have colons in them, indicating that it's a nested
   * property. This simply converts our answers hash into one that's appropriate
   * to use alongside our default config (config.json): in this case, that
   * method is the _.defaults() method above.
   */
  answersToConfig: function (answers) {
    var config = {}

    _(answers).each(function (answer, key) {
      var nested = _(key).contains(':')
      if (nested) {
        var split = key.split(':')
        var parentKey = _.first(split)
        var childKey = _.last(split)

        if (!config[parentKey]) config[parentKey] = {}
        config[parentKey][childKey] = answer
      }
      else {
        config[key] = answer
      }
    })

    return config
  },

  handleConfigAnswers: function (answers) {
    var customConfig = self.answersToConfig(answers)
    var fullConfig = _.defaults(customConfig, _defaults)
    self.config.defaults(fullConfig) // does a .save() for us too
    self.say("Okay, config file created!")
  }
})