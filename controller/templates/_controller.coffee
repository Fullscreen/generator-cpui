app = angular.module('<%= namespace(module) %>')

app.controller '<%= ctrlClass %>', class <%= ctrlClass %>
  constructor: (@$scope) ->
    # Modify your scope here
    @$scope.foobar = => 'foo' + @$scope.bar

