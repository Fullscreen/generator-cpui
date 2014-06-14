app = angular.module('<%= namespace(module) %>')

app.factory '<%= modelClass %>', (BaseModel) ->
  class <%= modelClass %> extends BaseModel

