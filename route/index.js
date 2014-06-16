var Base = require('../lib/cpui-base')
  , yosay = require('yosay')
  , path = require('path')

module.exports = Base.extend({
  init: function() {
    this.log(yosay("Let's create you a new route!"))

    this.argument('name', {
      desc: "The name of your new route",
      type: String,
      required: true
    })

    this.route      = this._.dasherize(this.name)
    this.routeTpml  = this._.dasherize(this.name + '-page')
    this.routeTitle = this._.camelize(this.route + '-controller')
  },

  files: function() {
    var tmplPath = path.join(this.cpui.paths.scripts, 'templates')
      , ctrlPath = path.join(this.cpui.paths.scripts, 'controllers')

    this.copy('_template.html', path.join(tmplPath, this.routeTpml + '.html'))
    this.copy('_controller.coffee', path.join(ctrlPath, this.route + '.coffee'))
  },

  rewriteJSRoutes: function() {
    var routesPath = path.join(this.cpui.paths.scripts, 'config', 'routes.coffee')
      , routes = this.dest.read(routesPath)
      , newRoute = this.src.read('_route')

    console.log(routes)
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

