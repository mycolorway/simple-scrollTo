
scrollTo =  (opts) ->
  defaultOpts =
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
  
  opts = $.extend defaultOpts, opts
  $target = $(opts.target) if opts.target
  $target = opts.position unless $target

  throw new Error "simple-scrollTo: target or position option is invalid" unless $target

  $container = if opts.container then $(opts.container) else $('body, html')

  #set offset
  if $target instanceof jQuery
    targetOffset = $target.offset()
    containerOffset = $container.offset() || {top: 0, left: 0}
    offset =
      top: targetOffset.top - containerOffset.top - opts.offset.top
      left: targetOffset.left - containerOffset.left - opts.offset.top
  else
    offset = $target

  #run it!
  if opts.animation
    options = {}
    options.scrollTop = offset.top if opts.axis.charAt('x') isnt -1
    options.scrollLeft = offset.left if opts.axis.charAt('y') isnt -1

    hasCalled = false
    fakeCallBack = ->
      return if hasCalled
      hasCalled = true
      opts.callback()
    $container.animate options, opts.duration, fakeCallBack
    null
  else
    $container.scrollLeft(offset.left) if opts.axis.charAt('y') isnt -1
    $container.scrollTop(offset.top) if opts.axis.charAt('x') isnt -1
    opts.callback()
    null

