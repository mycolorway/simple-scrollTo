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
    $container = $('<div class="container"></div>').appendTo('body');
    beforeEach(function() {
      return $('.container').empty();
    });
    it('should scroll to a target', function() {
      $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo($container);
      $('<div id="target"></div>').appendTo($container);
      $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo($container);
      simple.scrollTo({
        target: '#target',
        animation: false
      });
      return expect($(document).scrollTop()).toBe($('#target').offset().top);
    });
    return it('should not scroll when the target is visible', function() {
      $(document).scrollTop(0);
      $('<div class="blank" style="height: 100; width: 100px"></div>').appendTo($container);
      $('<div id="target"></div>').appendTo($container);
      $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo($container);
      simple.scrollTo({
        target: "#target",
        animation: false,
        actOnVisible: false
      });
      return expect($(document).scrollTop()).toBe(0);
    });
  });

}).call(this);
