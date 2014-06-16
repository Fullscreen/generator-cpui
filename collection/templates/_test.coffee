describe "The <%= collectionClass %> collection", ->
  <%= collectionClass %> = undefined
  BaseModel = undefined

  beforeEach ->
    module('<%= namespace(module) %>')

    inject (_<%= collectionClass %>_, _BaseModel_) ->
      <%= collectionClass %> = _<%= collectionClass %>_
      BaseModel = _BaseModel_

  it "should have tests", ->
    instance = new <%= collectionClass %>()
    instance.add(new BaseModel())

    expect(instance.length).toBe(1)
    expect('The awesome developer to have written tests').toBe(true)

