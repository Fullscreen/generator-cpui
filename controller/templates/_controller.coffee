app = angular.module('<%= namespace(module) %>')

app.controller '<%= ctrlClass %>', ($scope) ->
  # Modify your scope here
  $scope.foobar = -> 'foo' + $scope.bar

