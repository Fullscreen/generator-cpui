app = angular.module('<%= namespace(module) %>')

app.directive '<%= directive %>', () ->
  restrict: 'E'
  templateUrl: '<%= directiveDashed %>.html'

  controller: ($scope) ->
    # Set up your scope here
    if $scope.name
      $scope.greeting = "Hello, #{$scope.name}"
    else
      $scope.greeting = "Hello world!"

  link: (scope, el, attrs, ctrl) ->
    # Do your DOM hijinks here
