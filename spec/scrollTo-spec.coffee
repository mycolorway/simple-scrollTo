
describe 'Simple scrollTo', ->

  it 'should throw Error when opts is not correct', ->
    testException = ->
      simple.scrollTo()
    expect(testException).toThrow()

  it 'should scroll to a target', ->
    $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo 'body'
    $('<div id="target"></div>').appendTo 'body'
    $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo 'body'

    simple.scrollTo
      target: '#target'
      animation: false

    expect($(document).scrollTop()).toBe($('#target').offset().top)
