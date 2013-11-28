 angular.module('reack.filters', [])
  .filter('netMoney', function() {
  	return function (input) {
	    if (input !== undefined) {
	      return input + ' netto PLN';
	    } else {
	      return input;
	    }
	  }
  });