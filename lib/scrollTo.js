(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-scrollTo', ["jquery",
      "simple-module"], function ($, SimpleModule) {
      return (root.returnExportsGlobal = factory($, SimpleModule));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['scrollTo'] = factory(jQuery,
      SimpleModule);
  }
}(this, function ($, SimpleModule) {

var ScrollTo, scrollTo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ScrollTo = (function(_super) {
  __extends(ScrollTo, _super);

  function ScrollTo() {
    return ScrollTo.__super__.constructor.apply(this, arguments);
  }

  ScrollTo.prototype.opts = {
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

  ScrollTo.prototype._init = function() {
    var $target;
    $target = $(this.opts.target);
    if ($target.length) {
      this.target = $target;
    }
    if (!this.target && this.opts.position) {
      this.target = this.opts.position;
    }
    if (!this.target) {
      throw new Error("simple-scrollTo: target or position option is invalid");
    }
    this.container = this.opts.container ? $(this.opts.container) : $('body, html');
    this._setPosition();
    return this._run();
  };

  ScrollTo.prototype._run = function() {
    var fakeCallBack;
    if (this.opts.animation) {
      this.options = {};
      if (this.opts.axis.charAt('x') !== -1) {
        this.options.scrollTop = this.offset.top;
      }
      if (this.opts.axis.charAt('y') !== -1) {
        this.options.scrollLeft = this.offset.left;
      }
      fakeCallBack = (function(_this) {
        return function() {
          if (_this.hasCalled) {
            return;
          }
          _this.hasCalled = true;
          return _this.opts.callback();
        };
      })(this);
      return this.container.animate(this.options, this.opts.duration, fakeCallBack);
    } else {
      if (this.opts.axis.charAt('y') !== -1) {
        this.container.scrollLeft(this.offset.left);
      }
      if (this.opts.axis.charAt('x') !== -1) {
        this.container.scrollTop(this.offset.top);
      }
      return this.opts.callback();
    }
  };

  ScrollTo.prototype._setPosition = function() {
    var containerOffset, targetOffset;
    if (this.target instanceof jQuery) {
      targetOffset = this.target.offset();
      containerOffset = this.container.offset() || {
        top: 0,
        left: 0
      };
      return this.offset = {
        top: targetOffset.top - containerOffset.top - this.opts.offset.top,
        left: targetOffset.left - containerOffset.left - this.opts.offset.top
      };
    } else {
      return this.offset = this.target;
    }
  };

  return ScrollTo;

})(SimpleModule);

scrollTo = function(opts) {
  return new ScrollTo(opts);
};

return scrollTo;

}));

