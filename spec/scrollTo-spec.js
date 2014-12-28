(function() {
  describe('Simple scrollTo', function() {
    it('should throw Error when opts is not correct', function() {
      var testException;
      testException = function() {
        return simple.scrollTo();
      };
      return expect(testException).toThrow();
    });
    return it('should scroll to a target', function() {
      $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo('body');
      $('<div id="target"></div>').appendTo('body');
      $('<div class="blank" style="height: 2000px; width: 100px"></div>').appendTo('body');
      simple.scrollTo({
        target: '#target',
        animation: false
      });
      return expect($(document).scrollTop()).toBe($('#target').offset().top);
    });
  });

}).call(this);
