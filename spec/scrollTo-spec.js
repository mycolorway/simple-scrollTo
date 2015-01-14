(function() {
  describe('Simple scrollTo', function() {
    var $container;
    it('should throw Error when opts is not correct', function() {
      var testException;
      testException = function() {
        return simple.scrollTo();
      };
      return expect(testException).toThrow();
    });
    $container = null;
    beforeEach(function() {
      if ($container != null) {
        $container.remove();
      }
      return $container = $('<div class="container"></div>').appendTo('body');
    });
    describe('should scroll to a target', function() {
      beforeEach(function() {
        $('<div class="blank" style="height: 2000px; width: 600px"></div>').appendTo($container);
        $('<div id="target">I am here</div>').appendTo($container);
        return $('<div class="blank" style="height: 2000px; width: 600px"></div>').appendTo($container);
      });
      it('without specific container', function() {
        simple.scrollTo({
          target: '#target',
          animation: false
        });
        return expect($(document).scrollTop()).toBe(parseInt($('#target').offset().top));
      });
      return it('with specific container', function() {
        $container.css({
          height: '400px',
          width: '400px',
          overflow: 'scroll'
        });
        simple.scrollTo({
          target: '#target',
          offset: 20,
          container: $container,
          animation: false
        });
        return expect($('#target').offset().top - $container.offset().top).toBe(20);
      });
    });
    return describe('should not scroll when the target is visible', function() {
      beforeEach(function() {
        $(document).scrollTop(0);
        $('<div class="blank" style="height: 100px; width: 500px"></div>').appendTo($container);
        $('<div id="target">I am here</div>').appendTo($container);
        $('<div class="blank" style="height: 2000px; width: 500px"></div>').appendTo($container);
        return $container.css({
          height: '400px',
          width: '400px',
          overflow: 'scroll'
        });
      });
      it('without specific container', function() {
        simple.scrollTo({
          target: "#target",
          animation: false,
          container: $container,
          actOnVisible: false
        });
        return expect($container.scrollTop()).toBe(0);
      });
      return it('with specific container', function() {
        simple.scrollTo({
          target: "#target",
          container: $container,
          animation: false,
          actOnVisible: false
        });
        return expect($(document).scrollTop()).toBe(0);
      });
    });
  });

}).call(this);
