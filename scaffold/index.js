var Base = require('../lib/module-base.js')
  , pluralize = require('pluralize')
  , path = require('path')

module.exports = Base.extend({
  init: function() {
    this.say("Let's scaffold some things out for you!")
    this.selections = {}
  },

  getModule: function() {
    var done = this.async()
      , self = this

    this.getModuleName(function(name) {
      self.module = name
      self.createModule()
      done()
    })
  },

  gatherChoices: function() {
    var self = this
      , done = this.async()

    this.prompt([{
      type: 'checkbox',
      name: 'choices',
      message: "What do you want to add to you "+this.module+" module?",
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
      options: {
        mute: true,
        module: this.module,
        model: this.module
      }
    })
  },

  makeCollection: function() {
    if (!this.selections.collection) { return }

    this.invoke('cpui:collection', {
      options: {
        mute: true,
        module: this.module,
        model: this.module,
        collection: pluralize(this.module)
      }
    })
  },

  makeDirective: function() {
    if (!this.selections.directive) { return }

    this.invoke('cpui:directive', {
      options: {
        mute: true,
        module: this.module,
        hintHTML: false,
        directive: this.module,
        model: (this.selections.model ? this.module : false),
        collection: (this.selections.collection ? pluralize(this.module) : false)
      }
    })
  },

  makeRoute: function() {
    if (!this.selections.route) { return }

    this.invoke('cpui:route', {
      options: {
        mute: true,
        route: pluralize(this.module),
        directive: this.module
      }
    })
  },
})
