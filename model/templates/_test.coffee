describe "The <%= modelClass %> model", ->
  <%= modelClass %> = undefined

  beforeEach ->
    module('<%= namespace(module) %>')

    inject (_<%= modelClass %>_) ->
      <%= modelClass %> = _<%= modelClass %>_

  it "should have tests", ->
    instance = new <%= modelClass %>()
    expect('The awesome developer to have written tests').toBe(true)

