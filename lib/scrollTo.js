(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-scrollTo', ["jquery"], function ($) {
      return (root.returnExportsGlobal = factory($));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    root.simple = root.simple || {};
    root.simple['scrollTo'] = factory(jQuery);
  }
}(this, function ($) {

var scrollTo;

scrollTo = function(opts) {
  var $container, $target, containerOffset, defaultOpts, fakeCallBack, hasCalled, offset, options, targetOffset;
  defaultOpts = {
    target: null,
    position: null,
    container: null,
    axis: 'x',
    offset: {
      left: 0,
      top: 0
    },
    duration: 500,
    animation: true,
    callback: $.noop
  };
  opts = $.extend(defaultOpts, opts);
  if (opts.target) {
    $target = $(opts.target);
  }
  if (!$target) {
    $target = opts.position;
  }
  if (!$target) {
    throw new Error("simple-scrollTo: target or position option is invalid");
  }
  $container = opts.container ? $(opts.container) : $('body, html');
  if ($target instanceof jQuery) {
    targetOffset = $target.offset();
    containerOffset = $container.offset() || {
      top: 0,
      left: 0
    };
    offset = {
      top: targetOffset.top - containerOffset.top - opts.offset.top,
      left: targetOffset.left - containerOffset.left - opts.offset.top
    };
  } else {
    offset = $target;
  }
  if (opts.animation) {
    options = {};
    if (opts.axis.charAt('x') !== -1) {
      options.scrollTop = offset.top;
    }
    if (opts.axis.charAt('y') !== -1) {
      options.scrollLeft = offset.left;
    }
    hasCalled = false;
    fakeCallBack = function() {
      if (hasCalled) {
        return;
      }
      hasCalled = true;
      return opts.callback();
    };
    $container.animate(options, opts.duration, fakeCallBack);
    return null;
  } else {
    if (opts.axis.charAt('y') !== -1) {
      $container.scrollLeft(offset.left);
    }
    if (opts.axis.charAt('x') !== -1) {
      $container.scrollTop(offset.top);
    }
    opts.callback();
    return null;
  }
};

return scrollTo;

}));

