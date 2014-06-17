var Base = require('../lib/cpui-base')
  , path = require('path')

module.exports = Base.extend({
  init: function() {
    this.say("Let's create you a new route!")

    // Initing vars we'll use in our underscore template
    this.directive = undefined
    this.directiveTag = undefined

    this.argument('name', {
      desc: "The name of your new route",
      type: String,
      required: true
    })

    this.option('directive', {
      desc: 'A directive to drop into your new page',
      defaults: false
    })

    if (this.options.directive) {
      this.directive = this._.dasherize(this.options.directive)
      this.directiveTag = "<"+this.directive+"></"+this.directive+">"
    }

    this.route      = this._.dasherize(this.name)
    this.routeTpml  = this._.dasherize(this.name + '-page')
    this.routeTitle = this._.camelize(this.route + '-controller')
  },

  files: function() {
    var tmplPath = path.join(this.cpui.paths.scripts, 'templates')
      , ctrlPath = path.join(this.cpui.paths.scripts, 'controllers')

    this.template('_template.html', path.join(tmplPath, this.routeTpml + '.html'))
    this.template('_controller.coffee', path.join(ctrlPath, this.route + '.coffee'))
  },

  rewriteJSRoutes: function() {
    var routesPath = path.join(this.cpui.paths.scripts, 'config', 'routes.coffee')
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

