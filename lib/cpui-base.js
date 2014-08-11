var yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , fs = require('fs')
  , _ = require('underscore')
  , self = null
  , done = null
  , _defaults = null
  , _generatorToInvoke = undefined

module.exports = yeoman.generators.Base.extend({
  constructor: function (derp, context) {
    yeoman.generators.Base.apply(this, arguments)
    _generatorToInvoke = context.namespace
    self = this
    done = this.async()

    // default config file
    _defaults = this.src.readJSON('../../config.json')

    // Provide a hidden mute option so we can mute sub generators when invoking
    // them externally
    this.option('mute', {
      type: Boolean,
      defaults: false,
      hide: true
    })
  },


  // Helper method to apply an optional angular namespace to a module name
  namespace: function(module) {
    return this.config.get('namespace') + module
  },

  // Insert new content before a comment section in content
  prepend: function(content, section, newContent) {
    var placeholder = this.config.get('separators').pre + section
    return content.replace(placeholder, placeholder+"\n"+newContent)
  },

  // Insert new content after a comment section in content
  append: function(content, section, newContent) {
    var placeholder = this.config.get('separators').post + section
    return content.replace(placeholder, newContent+"\n"+placeholder)
  },

  say: function(message) {
    if (this.options.mute) { return }
    this.log(yosay(message))
  },

  ask: function(message, cb) {
    this.prompt([{
      type: 'input',
      name: 'varname',
      message: message
    }], function (props) {
      cb(props.varname)
    })
  },

  configExists: function () {
    // TODO do more than just checking for the existence of _any_ config item
    return !_.isEmpty(this.config.getAll())
  },

  createConfig: function () {
    if (self.configExists()) {
      return
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

    var message = "Let's not get ahead of ourselves. We need to make you a " +
        "config file first. (.yo-rc.json)"
    this.say(message)
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

    self.invoke(_generatorToInvoke, {options: {mute: true}})
  }
})
