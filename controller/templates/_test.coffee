describe 'The <%= ctrlClass %>', ->
  factory = undefined

  beforeEach ->
    module('<%= namespace(module) %>')

    factory = (options) ->
      scope = undefined
      controller = undefined

      # Create a new controller instance and DI our scope and requirements
      inject ($rootScope, $controller) ->
        $rootScope[key] = val for key, val of options # Copy options to $rootScope
        scope = $rootScope.$new()
        controller = $controller '<%= ctrlClass %>',
          $scope: scope
          bar: 'bar'
      [scope, controller] # Return the scope and controller

  it "should have tests", ->
    [scope, ctrl] = factory(bar: 'bar')

    expect(scope.foobar()).toBe('foobar')
    expect("The really cool, (and rather suave) developer to have written tests").toBe(false)
