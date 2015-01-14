
describe 'Simple scrollTo', ->

  it 'should throw Error when opts is not correct', ->
    testException = ->
      simple.scrollTo()
    expect(testException).toThrow()

  $container = null

  beforeEach ->
    $container?.remove()
    $container = $('<div class="container"></div>').appendTo 'body'

  describe 'should scroll to a target', ->
    beforeEach ->
      $('<div class="blank" style="height: 2000px; width: 600px"></div>').appendTo $container
      $('<div id="target">I am here</div>').appendTo $container
      $('<div class="blank" style="height: 2000px; width: 600px"></div>').appendTo $container

    it 'without specific container', ->
      simple.scrollTo
        target: '#target'
        animation: false
      expect($(document).scrollTop()).toBe parseInt($('#target').offset().top)

    it 'with specific container', ->
      $container.css
        height: '400px'
        width: '400px'
        overflow: 'scroll'
      simple.scrollTo
        target: '#target'
        offset: 20
        container: $container
        animation: false
      expect($('#target').offset().top - $container.offset().top).toBe 20

  describe 'should not scroll when the target is visible', ->
    beforeEach ->
      $(document).scrollTop(0)
      $('<div class="blank" style="height: 100px; width: 500px"></div>').appendTo $container
      $('<div id="target">I am here</div>').appendTo $container
      $('<div class="blank" style="height: 2000px; width: 500px"></div>').appendTo $container
      $container.css
        height: '400px'
        width: '400px'
        overflow: 'scroll'

    it 'without specific container', ->
      simple.scrollTo
        target: "#target"
        animation: false
        container: $container
        actOnVisible: false
      expect($container.scrollTop()).toBe(0)

    it 'with specific container', ->
      simple.scrollTo
        target: "#target"
        container: $container
        animation: false
        actOnVisible: false
      expect($(document).scrollTop()).toBe(0)
