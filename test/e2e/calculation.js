'use strict';

describe('Receipt sum', function() {

	beforeEach(function(){
		browser().navigateTo('/');

	});

	it('should calculate receipt sum', function(){
		browser().navigateTo('#/receipt');
		input('timeWorked').enter('12');
		input('dailyWage').enter('10000');
		expect(element('span.sum').text()).toEqual('120000');
	});

	it('should correctly interpret time provided in hours', function(){
		browser().navigateTo('#/receipt');
		input('timeWorked').enter('160h');
		input('dailyWage').enter('10000');
		expect(element('span.sum').text()).toEqual('200000');
	});
})