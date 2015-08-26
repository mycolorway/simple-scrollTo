
scrollTo =  (opts) ->
  defaultOpts =
    target: null
    container: null
    axis: 'y'
    offset: null
    duration: 500
    animation: true
    cancelIfVisible: true
    callback: $.noop

  opts = $.extend defaultOpts, opts
  $target = $(opts.target) if opts.target

  throw new Error "simple-scrollTo: target or offset option is invalid" if not $target and opts.offset is null

  $container = if opts.container then $(opts.container) else $('body, html')

  opts.offset = 0 unless opts.offset

  if typeof opts.offset is 'object'
    offset = $.extend {}, opts.offset
  else
    offset =
      x: opts.offset
      y: opts.offset

  #set offset if scroll to target
  if $target
    targetOffset = $target.offset()

    if opts.container
      containerOffset = $container.offset()
      targetOffset =
        top: targetOffset.top - containerOffset.top + $container.scrollTop()
        left: targetOffset.left - containerOffset.left + $container.scrollLeft()

    offset =
      y: targetOffset.top - offset.y
      x: targetOffset.left - offset.x

  if opts.cancelIfVisible
    unless opts.container
      viewpartHeight = ($win = $ window).height()
      viewpartWidth = $win.width()
      scrollTop = ($doc = $ document).scrollTop()
      scrollLeft = $doc.scrollLeft()
    else
      viewpartHeight = $container.height()
      viewpartWidth = $container.width()
      scrollTop = $container.scrollTop()
      scrollLeft = $container.scrollLeft()

    if (offset.y >= scrollTop and offset.y < scrollTop + viewpartHeight) \
        and (offset.x >= scrollLeft and offset.x < scrollLeft + viewpartWidth)
      return

  #run it!
  if opts.animation
    options =
      scrollTop: if opts.axis isnt 'x' then offset.y else undefined
      scrollLeft: if opts.axis isnt 'y' then offset.x else undefined

    #prevent trigger twice callback
    hasCalled = false
    fakeCallBack = ->
      return if hasCalled
      hasCalled = true
      opts.callback()
    $container.animate options, opts.duration, fakeCallBack
    null

  else
    $container.scrollTop(offset.y) if opts.axis isnt 'x'
    $container.scrollLeft(offset.x) if opts.axis isnt 'y'
    opts.callback()
    null
