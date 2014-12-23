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
    container: null,
    axis: 'y',
    offset: {
      x: 0,
      y: 0
    },
    duration: 500,
    animation: true,
    callback: $.noop
  };
  opts = $.extend(defaultOpts, opts);
  if (opts.target) {
    $target = $(opts.target);
  }
  if (!($target || opts.offset)) {
    throw new Error("simple-scrollTo: target option is invalid");
  }
  $container = opts.container ? $(opts.container) : $('body, html');
  if (typeof opts.offset !== 'object') {
    opts.offset = {
      x: opts.offset,
      y: opts.offset
    };
  }
  if ($target) {
    targetOffset = $target.offset();
    containerOffset = $container.offset() || {
      top: 0,
      left: 0
    };
    offset = {
      y: targetOffset.top - containerOffset.top - opts.offset.y,
      x: targetOffset.left - containerOffset.left - opts.offset.x
    };
  } else {
    offset = opts.offset;
  }
  if (opts.animation) {
    options = {};
    if (opts.axis === 'y') {
      options.scrollTop = offset.y;
    } else if (offset.axis === 'x') {
      options.scrollLeft = offset.x;
    } else {
      options = {
        scrollTop: offset.y,
        scrollLeft: offset.x
      };
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
    if (opts.axis === 'y') {
      $container.scrollTop(offset.y);
    } else if (opts.axis === 'x') {
      $container.scrollLeft(offset.x);
    } else {
      $container.scrollLeft(offset.x);
      $container.scrollTop(offset.y);
    }
    opts.callback();
    return null;
  }
};

return scrollTo;

}));

