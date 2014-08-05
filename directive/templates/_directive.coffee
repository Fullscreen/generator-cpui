app = angular.module('<%= namespace(module) %>')

app.directive '<%= directive %>', () ->
  restrict: 'E'
  templateUrl: '<%= directiveDashed %>.html'
  controller: '<%= ctrlClass %>'
  controllerAs: 'ctrl'
  link: (scope, el, attrs, ctrl) ->
    # Do your DOM hijinks here

app.controller '<%= ctrlClass %>', class <%= ctrlClass %>
  constructor: (@$scope<%= collection ? ', '+collection : '' %><%= model ? ', '+model : '' %>) ->
    # Set up your scope here
<% if (collection) { %>
    @$scope.collection = new <%= collection %>()
<% } %><% if (model) { %>
    @$scope.collection.add(new <%= model %>(id: num)) for num in [1..10]
<% } %>
  greeting: ->
    if @$scope.name then "Hello, #{@$scope.name}"
    else "Welcome to your new <%= pluralize(module) %> directive!"

