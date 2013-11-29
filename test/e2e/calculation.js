'use strict';

describe('Receipt sum', function() {

	beforeEach(function(){
		browser().navigateTo('/');

	});

	it('should calculate receipt sum', function(){
		browser().navigateTo('#/receipt');
		input('timeWorked').enter('12');
		input('dailyWage').enter('10000');
		
		var count = element('span.sum').count();
		for (var i = 0; i < count; i++) {
			expect(repeater('span.sum').row(i).text()).toEqual('120000 netto PLN');
		}
	});

	it('should correctly interpret time provided in hours', function(){
		browser().navigateTo('#/receipt');
		input('timeWorked').enter('160h');
		input('dailyWage').enter('10000');

		var count = element('span.sum').count();
		for (var i = 0; i < count; i++) {
			expect(repeater('span.sum').row(i).text()).toEqual('200000 netto PLN');
		}
	});
})