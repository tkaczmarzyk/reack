'use strict';

var reackServices = angular.module('reackServices', []);

reackServices.factory('Calculation', function() {
	console.log("reackServices.factory");

	return {
		calculate : function(dailyWage, timeWorked) {
			_.mixin(_.str.exports());
			console.log(_(timeWorked).trim());
			if (timeWorked !== undefined) {
				if (_(timeWorked).endsWith('h')) {
					timeWorked = _(timeWorked).strLeft('h') / 8.0;
				}
				return dailyWage * timeWorked;
			} else {
				return 0;
			}
		}
	};
});