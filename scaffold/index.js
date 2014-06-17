var Base = require('../lib/cpui-base')
  , pluralize = require('pluralize')
  , path = require('path')

module.exports = Base.extend({
  init: function() {
    this.say("Let's scaffold some things out for you!")
    this.selections = {}
  },

  // Prompt for the module name if it's not specified
  getModuleName: function() {
    if (this.module) { return }

    var done = this.async()
      , self = this

    this.prompt([{
      type: 'input',
      name: 'module',
      message: 'What module are we scaffolding out today?'
    }], function (props) {
      self.module = props.module
      done()
    })
  },

  // Prompt to create the module if it doesn't exist already
  createModule: function() {
    if (this.moduleExists()) { return }

    var done = this.async()
      , self = this

    this.prompt([{
      type: 'confirm',
      name: 'create',
      message: "The \""+this.module+"\" module doesn't exist yet, should I create it?"
    }], function (props) {
      if (props.create) {
        self.invoke('cpui:module', {args: [self.module]})
      } else {
        self.log("Nope? Sorry, can't help you then")
        process.exit(1)
      }

      done()
    })

  },

  gatherChoices: function() {
    var self = this
      , done = this.async()

    this.prompt([{
      type: 'checkbox',
      name: 'choices',
      message: "What do you want to add to you \""+this.module+"\" module?",
      choices: [
        { value: 'model', name: 'A model class', checked: true },
        { value: 'collection', name: 'A collection class', checked: true },
        { value: 'directive', name: 'A new directive', checked: true },
        { value: 'route', name: 'A route', checked: true }
      ]
    }], function (props) {
      props.choices.forEach(function(choice) { self.selections[choice] = true })
      done()
    })
  },

  makeModel: function() {
    if (!this.selections.model) { return }

    this.invoke('cpui:model', {
      options: {mute: true},
      args: [this.module, this.module]
    })
  },

  makeCollection: function() {
    if (!this.selections.collection) { return }

    this.invoke('cpui:collection', {
      options: {
        mute: true,
        model: this.module
      },
      args: [this.module, pluralize(this.module)]
    })
  },

  makeDirective: function() {
    if (!this.selections.directive) { return }

    this.invoke('cpui:directive', {
      options: {
        mute: true,
        hintHTML: false,
        model: (this.selections.model ? this.module : false),
        collection: (this.selections.collection ? pluralize(this.module) : false)
      },
      args: [this.module, this.module]
    })
  },

  makeRoute: function() {
    if (!this.selections.route) { return }

    this.invoke('cpui:route', {
      options: {
        mute: true,
        directive: this.module
      },
      args: [pluralize(this.module)]
    })
  },
})

