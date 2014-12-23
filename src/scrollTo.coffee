
scrollTo =  (opts) ->
  defaultOpts =
    target: null
    container: null
    axis: 'y'
    offset:
      x: 0
      y: 0
    duration: 500
    animation: true
    callback: $.noop

  opts = $.extend defaultOpts, opts
  $target = $(opts.target) if opts.target

  throw new Error "simple-scrollTo: target option is invalid" unless $target or opts.offset

  $container = if opts.container then $(opts.container) else $('body, html')

  unless typeof opts.offset is 'object'
    opts.offset =
      x: opts.offset
      y: opts.offset

  #set offset
  if $target
    targetOffset = $target.offset()
    containerOffset = $container.offset() || {top: 0, left: 0}
    offset =
      y: targetOffset.top - containerOffset.top - opts.offset.y
      x: targetOffset.left - containerOffset.left - opts.offset.x
  else
    offset = opts.offset

  #run it!
  if opts.animation
    options = {}
    if opts.axis is 'y'
      options.scrollTop = offset.y
    else if offset.axis is 'x'
      options.scrollLeft = offset.x
    else
      options =
        scrollTop: offset.y
        scrollLeft: offset.x

    #prevent trigger twice callback
    hasCalled = false
    fakeCallBack = ->
      return if hasCalled
      hasCalled = true
      opts.callback()
    $container.animate options, opts.duration, fakeCallBack
    null

  else
    if opts.axis is 'y'
      $container.scrollTop(offset.y)
    else if opts.axis is 'x'
      $container.scrollLeft(offset.x)
    else
      $container.scrollLeft(offset.x)
      $container.scrollTop(offset.y)
    opts.callback()
    null

