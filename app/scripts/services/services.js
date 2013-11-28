'use strict';

var reackServices = angular.module('reackServices', []);

reackServices.factory('Calculation', function() {
	console.log("reackServices.factory");

	return {
		calculate : function(dailyWage, timeWorked) {
			if (timeWorked !== undefined) {
				if (_(timeWorked).endsWith('h')) {
					timeWorked = _(timeWorked).strLeft('h');
					timeWorked =  timeWorked / 8.0;
				}
				return dailyWage * timeWorked;
			} else {
				return 0;
			}
		}
	};
});

reackServices.factory('Persistence', function() {
	var dailyWage = null;
	return {
		loadDailyWage : function() {
			return dailyWage;
		},
		saveDailyWage : function(wage) {
			dailyWage = wage;
		}
	};
});

reackServices.factory('Timesheet', function() {

});