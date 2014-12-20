
class ScrollTo extends SimpleModule
  opts:
    target: null
    position: null
    container: null
    axis: 'x'
    offset:
      left: 0
      top: 0
    duration: 500
    animation: true
    callback: $.noop

  _init: ->
    $target = $(@opts.target)
    @target = $target if $target.length
    @target = @opts.position if not @target and @opts.position
    throw new Error "simple-scrollTo: target or position option is invalid" unless @target

    #a browser patch, but will trigger Callback twice
    @container = if @opts.container then $(@opts.container) else $('body, html')

    @_setPosition()
    @_run()

  _run: ->
    if @opts.animation
      @options = {}
      @options.scrollTop = @offset.top if @opts.axis.charAt('x') isnt -1
      @options.scrollLeft = @offset.left if @opts.axis.charAt('y') isnt -1

      #prevent trigger callback twice
      fakeCallBack = =>
          return if @hasCalled
          @hasCalled = true
          @opts.callback()

      @container.animate @options, @opts.duration, fakeCallBack
    else
      @container.scrollLeft(@offset.left) if @opts.axis.charAt('y') isnt -1
      @container.scrollTop(@offset.top) if @opts.axis.charAt('x') isnt -1
      @opts.callback()

  _setPosition: ->
    if @target instanceof jQuery
      targetOffset = @target.offset()
      containerOffset = @container.offset() || {top: 0, left: 0}
      @offset =
        top: targetOffset.top - containerOffset.top - @opts.offset.top
        left: targetOffset.left - containerOffset.left - @opts.offset.top
    else
      @offset = @target

scrollTo = (opts) ->
  new ScrollTo(opts)