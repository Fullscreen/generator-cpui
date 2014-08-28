app = angular.module('<%= config.get("rootModule") %>')

app.controller '<%= routeTitle %>', ($scope) ->
  $scope.sayHi = ->
    window.alert('Oh hai!')
