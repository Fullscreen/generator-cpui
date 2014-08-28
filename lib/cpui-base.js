var yeoman = require('yeoman-generator')
  , yosay = require('yosay')
  , fs = require('fs')
  , _ = require('underscore')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)

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
    var config = this.config.getAll()

    // TODO do more than just checking for the existence of _any_ config item
    return (_.isEmpty(config)) ? false : true
  },

  createConfig: function (done) {
    var defaults = this.src.readJSON('../../config.json')
      , self = this
      , message = ""

    if (this.configExists()) {
      message = "You have a config file already, but let's just make " +
          "a new one anyway."
      this.log(yosay(message))
    } else {
      message = "Let's not get ahead of ourselves. We need to make you a " +
          "config file first. (.yo-rc.json)"
      this.log(yosay(message))
    }

    var questions = [
      {
        type: 'input',
        name: 'rootModule',
        default: defaults.rootModule,
        message: "What's the name of your root Angular module?"
      },
      {
        type: 'input',
        name: 'namespace',
        default: defaults.namespace,
        message: "What namespace do you want to prefix your module names with?"
      },
      {
        type: 'input',
        name: 'paths:scripts',
        default: defaults.paths.scripts,
        message: "Where are your javascript files?"
      },
      {
        type: 'input',
        name: 'paths:styles',
        default: defaults.paths.styles,
        message: "Where are your stylesheets?"
      },
      {
        type: 'input',
        name: 'paths:specs',
        default: defaults.paths.specs,
        message: "Where are your test files?"
      }
    ]

    this.prompt(questions, function(answers) {
      self.handleConfigAnswers(answers)
      done()
    })
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
    var customConfig = this.answersToConfig(answers)
    var fullConfig = _.defaults(customConfig, this.src.readJSON('../../config.json'))
    this.config.set(fullConfig) // does a .save() for us too
    this.log(yosay("Okay, config file created!"))
  }
})
