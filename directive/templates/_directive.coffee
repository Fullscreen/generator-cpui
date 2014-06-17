app = angular.module('<%= namespace(module) %>')

app.directive '<%= directive %>', () ->
  restrict: 'E'
  templateUrl: '<%= directiveDashed %>.html'

  controller: ($scope<%= collection ? ', '+collection : '' %><%= model ? ', '+model : '' %>) ->
    # Set up your scope here
    if $scope.name
      $scope.greeting = "Hello, #{$scope.name}"
    else
      $scope.greeting = "Welcome to your new <%= pluralize(module) %> directive!"
<% if (collection) { %>
    $scope.collection = new <%= collection %>()
<% } %><% if (model) { %>
    $scope.collection.add(new <%= model %>(id: num)) for num in [1..10]
<% } %>

  link: (scope, el, attrs, ctrl) ->
    # Do your DOM hijinks here
