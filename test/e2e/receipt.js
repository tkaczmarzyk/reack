'use strict';

describe('Receipt ', function() {

	beforeEach(function(){
		browser().navigateTo('/');

	});

	it('should contain valid data from local storage: name, managerName & dailyWage', function(){
		browser().navigateTo('#/config');
		input('config.name').enter('moje imie');
		input('config.managerName').enter('imie manago');
		input('config.dailyWage').enter('1378.89');
		input('config.beeboleToken').enter('dummyToken');
		element('#saveConfig').click();
		
		browser().navigateTo('/');
		element('#calculate').click();

		expect(element('#managerName').text()).toEqual('imie manago');
		expect(element('#name').text()).toEqual('moje imie');

		var count = element('#dailyWage').count();
		for (var i = 0; i < count; i++) {
			expect(repeater('#dailyWage').row(i).text()).toEqual('1378.89 netto PLN');
		}
	});

})