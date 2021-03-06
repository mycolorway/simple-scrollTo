(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simple-scrollTo', ["jquery"], function (a0) {
      return (root['scrollTo'] = factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    root.simple = root.simple || {};
    root.simple['scrollTo'] = factory(jQuery);
  }
}(this, function ($) {

var scrollTo;

scrollTo = function(opts) {
  var $container, $doc, $target, $win, containerOffset, defaultOpts, fakeCallBack, hasCalled, offset, options, scrollLeft, scrollTop, targetOffset, viewpartHeight, viewpartWidth;
  defaultOpts = {
    target: null,
    container: null,
    axis: 'y',
    offset: null,
    duration: 500,
    animation: true,
    cancelIfVisible: true,
    callback: $.noop
  };
  opts = $.extend(defaultOpts, opts);
  if (opts.target) {
    $target = $(opts.target);
  }
  if (!$target && opts.offset === null) {
    throw new Error("simple-scrollTo: target or offset option is invalid");
  }
  $container = opts.container ? $(opts.container) : $('body, html');
  if (!opts.offset) {
    opts.offset = 0;
  }
  if (typeof opts.offset === 'object') {
    offset = $.extend({}, opts.offset);
  } else {
    offset = {
      x: opts.offset,
      y: opts.offset
    };
  }
  if ($target) {
    targetOffset = $target.offset();
    if (opts.container) {
      containerOffset = $container.offset();
      targetOffset = {
        top: targetOffset.top - containerOffset.top + $container.scrollTop(),
        left: targetOffset.left - containerOffset.left + $container.scrollLeft()
      };
    }
    offset = {
      y: targetOffset.top - offset.y,
      x: targetOffset.left - offset.x
    };
  }
  if (opts.cancelIfVisible) {
    if (!opts.container) {
      viewpartHeight = ($win = $(window)).height();
      viewpartWidth = $win.width();
      scrollTop = ($doc = $(document)).scrollTop();
      scrollLeft = $doc.scrollLeft();
    } else {
      viewpartHeight = $container.height();
      viewpartWidth = $container.width();
      scrollTop = $container.scrollTop();
      scrollLeft = $container.scrollLeft();
    }
    if ((offset.y >= scrollTop && offset.y < scrollTop + viewpartHeight) && (offset.x >= scrollLeft && offset.x < scrollLeft + viewpartWidth)) {
      return;
    }
  }
  if (opts.animation) {
    options = {
      scrollTop: opts.axis !== 'x' ? offset.y : void 0,
      scrollLeft: opts.axis !== 'y' ? offset.x : void 0
    };
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
    if (opts.axis !== 'x') {
      $container.scrollTop(offset.y);
    }
    if (opts.axis !== 'y') {
      $container.scrollLeft(offset.x);
    }
    opts.callback();
    return null;
  }
};

return scrollTo;

}));
