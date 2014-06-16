app = angular.module('<%= namespace(module) %>')

app.factory '<%= collectionClass %>', (BaseCollection) ->
  class <%= collectionClass %> extends BaseCollection

