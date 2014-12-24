(function() {
  describe('Simple scrollTo', function() {
    beforeEach(function() {
      return jasmine.clock().install();
    });
    afterEach(function() {
      return jasmine.clock().uninstall();
    });
    it('should throw Error when opts is not correct', function() {
      var testException;
      testException = function() {
        return simple.scrollTo();
      };
      return expect(testException).toThrow();
    });
    return it('should scroll to a target', function() {
      $('<div class="blank" style="height: 200px; width: 100px"></div>').appendTo('body');
      $('<div id="target"></div>').appendTo('body');
      $('<div class="blank" style="height: 1000px; width: 100px"></div>').appendTo('body');
      simple.scrollTo({
        target: '#target',
        duration: 100
      });
      jasmine.clock().tick(100);
      return expect($('body, html').scrollTop()).toBe($('#target').offset().top);
    });
  });

}).call(this);
