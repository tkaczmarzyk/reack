'use strict';

describe('Integration with backend', function() {

	beforeEach(function(){
		browser().navigateTo('/');

	});

	it('should display hello message from server', function(){
		browser().navigateTo('#/hello?name=Jetty');
		
		expect(element('h3.msg').text()).toEqual('Hello Jetty');
	});
});