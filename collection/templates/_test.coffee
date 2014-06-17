describe "The <%= collectionClass %> collection", ->
  <%= collectionClass %> = undefined
  <%= model ? model : 'BaseModel' %> = undefined

  beforeEach ->
    module('<%= namespace(module) %>')

    inject (_<%= collectionClass %>_, <%= model ? '_'+model+'_' : '_BaseModel_' %>) ->
      <%= collectionClass %> = _<%= collectionClass %>_
      <%= model ? model + '= _'+model+'_' : "BaseModel = _BaseModel_" %>

  it "should have tests", ->
    instance = new <%= collectionClass %>()
    instance.add(new <%= model ? model : 'BaseModel' %>())

    expect(instance.length).toBe(1)
    expect('The awesome developer to have written tests').toBe(true)

