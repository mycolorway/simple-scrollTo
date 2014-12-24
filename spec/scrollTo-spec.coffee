
describe 'Simple scrollTo', ->
  beforeEach ->
    jasmine.clock().install()

  afterEach ->
    jasmine.clock().uninstall()

  it 'should throw Error when opts is not correct', ->
    testException = ->
      simple.scrollTo()
    expect(testException).toThrow()

  it 'should scroll to a target', ->
    $('<div class="blank" style="height: 200px; width: 100px"></div>').appendTo 'body'
    $('<div id="target"></div>').appendTo 'body'
    $('<div class="blank" style="height: 1000px; width: 100px"></div>').appendTo 'body'

    simple.scrollTo
      target: '#target'
      duration: 100
    jasmine.clock().tick(100)

    expect($('body, html').scrollTop()).toBe($('#target').offset().top)