describe('filter', function() {

  beforeEach(module('reack.filters'));
     
  describe('netMoney', function() {
    it('should add net money label', inject(function(netMoneyFilter) {
      expect(netMoneyFilter(123)).toBe('123 netto PLN');
    }));

    it('should not add label to an undefined value', inject(function(netMoneyFilter) {
      expect(netMoneyFilter(undefined)).toBe(undefined);
    }));
  });
});