var Base = require('../lib/cpui-base.js')
  , path = require('path')

module.exports = Base.extend({
  constructor: function() {
    Base.apply(this, arguments)

    this.option('route', {
      type: String,
      desc: "The name of your new route"
    })

    this.option('directive', {
      desc: 'A directive to drop into your new page',
      defaults: false
    })
  },

  init: function() {
    if (!this.configExists()) {
      this.createConfig(this.async())
    }
  },

  create: function () {
    this.say("Let's create you a new route!")

    // Initing vars we'll use in our underscore template
    this.directive = undefined
    this.directiveTag = undefined

    if (this.options.directive) {
      this.directive = this._.dasherize(this.options.directive)
      this.directiveTag = "<"+this.directive+"></"+this.directive+">"
    }

    if (this.options.route) {
      this._setRoute(this.options.route)
    }
  },

  _setRoute: function(route) {
    this.name       = route
    this.route      = this._.dasherize(route)
    this.routeTpml  = this._.dasherize(route + '-page')
    this.routeTitle = this._.camelize(route + '-controller')
  },

  getName: function() {
    if (this.route) { return }

    var done = this.async()
      , self = this

    this.ask("What's the name of your route?", function(name) {
      self._setRoute(name)
      done()
    })
  },

  files: function() {
    var tmplPath = path.join(this.config.get('paths').scripts, 'templates')
      , ctrlPath = path.join(this.config.get('paths').scripts, 'controllers')

    this.template('_template.html', path.join(tmplPath, this.routeTpml + '.html'))
    this.template('_controller.coffee', path.join(ctrlPath, this.route + '.coffee'))
  },

  rewriteJSRoutes: function() {
    var routesPath = path.join(this.config.get('paths').scripts, 'config', 'routes.coffee')
      , routes = this.dest.read(routesPath)
      , newRoute = this.src.read('_route')

    routes = this.append(routes, "App routes", this.engine(newRoute, this))

    this.dest.write(routesPath, routes)
  },

  rewriteRBRoutes: function() {
    var routesPath = path.join('config', 'routes.rb')
      , routes = this.dest.read(routesPath)

    routes = this.append(routes, "App routes", "  get '/"+this.route+"', to: 'welcome#index'")

    this.dest.write(routesPath, routes)
  }
})
