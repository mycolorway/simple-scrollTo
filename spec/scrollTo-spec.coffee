
describe 'Simple scrollTo', ->

  it 'should throw Error when opts is not correct', ->
    testException = ->
      simple.scrollTo()
    expect(testException).toThrow()

  $container = $('<div class="container"></div>').appendTo 'body'

  beforeEach ->
    $('.container').empty()

  it 'should scroll to a target', ->
    $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo $container
    $('<div id="target"></div>').appendTo $container
    $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo $container

    simple.scrollTo
      target: '#target'
      animation: false

    expect($(document).scrollTop()).toBe($('#target').offset().top)

  it 'should not scroll when the target is visible', ->
    $(document).scrollTop(0)
    $('<div class="blank" style="height: 100; width: 100px"></div>').appendTo $container
    $('<div id="target"></div>').appendTo $container
    $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo $container
    simple.scrollTo
      target: "#target"
      animation: false
      actOnVisible: false
    expect($(document).scrollTop()).toBe(0)
