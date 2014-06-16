app = angular.module('<%= cpui.rootModule %>')

app.controller '<%= routeTitle %>', ($scope) ->
  $scope.sayHi = ->
    window.alert('Oh hai!')
