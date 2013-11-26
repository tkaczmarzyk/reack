'use strict';

describe('First E2E test', function() {

	beforeEach(function(){
		browser().navigateTo('/');

	});

	it('should calculate receipt sum', function(){
		browser().navigateTo('#/receipt');
		input('timeWorked').enter('12');
		input('dailyWage').enter('10000');
		expect(element('span.sum').text()).toEqual('120000');
	});
})