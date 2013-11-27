'use strict';

var reackServices = angular.module('reackServices', []);

reackServices.factory('Calculation', function() {
	console.log("reackServices.factory");

	return {
		calculate : function(dailyWage, timeWorked) {
			return dailyWage * timeWorked;
		}
	};
});