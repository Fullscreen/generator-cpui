#= require_self
#= require_tree .

angular.module('<%= namespace(module) %>', ['<%= config.get("rootModule") %>', 'fs.collections'])
