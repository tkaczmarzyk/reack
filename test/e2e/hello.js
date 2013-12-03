'use strict';

describe('Integration with backend', function() {

	var mockBackend;

	beforeEach(function($httpBackend){
		mockBackend = $httpBackend;
		browser().navigateTo('/');
	});

	it('should display hello message from server', function(){
		//mockBackend.whenGET('/api/hello?name=Jetty').respond('Hello Jetty');
		browser().navigateTo('#/hello/Jetty');
		
		expect(element('h3.msg').text()).toEqual('Hello Jetty');
	});
});