app = angular.module('<%= namespace(module) %>')

app.factory '<%= collectionClass %>', (BaseCollection<%= model ? ', '+model : ''%>) ->
  class <%= collectionClass %> extends BaseCollection
    <% if (model) { %>model: <%= model %><% } %>

