'use strict';

describe('First E2E test', function() {

	beforeEach(function(){
		browser().navigateTo('/receipt');
	});

	it('should calculate receipt sum', function(){
		input('timeWorked').enter(12);
		input('dailyWage').enter(10000);

		expect('sum').toEqual(120000);
	});
})