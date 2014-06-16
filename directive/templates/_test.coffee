describe 'The <%= directive %> directive', ->
  factory = undefined

  beforeEach ->
    module('<%= namespace(module) %>')
    module('<%= directiveDashed %>.html')

    # Takes a hash of keys/values to set on the root scope
    factory = (options) ->
      el = undefined
      inject ($rootScope, $compile) ->
        $rootScope[key] = val for key, val of options
        el = $compile("<%= directiveTag %>")($rootScope)
        $rootScope.$digest()
      [el, el.scope()] # Returns the element and its scope

  it "should have tests", ->
    greeting = 'Hello, Bob'
    [el, scope] = factory(name: 'Bob') # $rootsScope.name = 'Bob'

    expect(el.find('h1').text()).toBe(greeting)
    expect(scope.greeting).toBe(greeting)

    expect("The really awesome, (did I mention you look great today?) developer to have written tests").toBe(false)

