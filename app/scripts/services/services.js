/* global _:false */
'use strict';

var reackServices = angular.module('reackServices', [])
	.value('localStorage', window.localStorage);

reackServices.factory('Calculation', function() {

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

reackServices.factory('Persistence', function(localStorage) {
	var dailyWage = null;
	return {
		loadConfig : function() {
			var config = localStorage.config;
			return config ? JSON.parse(localStorage.config) : {};
		},
		saveConfig : function(config) {
			localStorage.config = JSON.stringify(config);
		}
	};
});

reackServices.factory('Timesheet', ['$http', '$timeout', function($http, $timeout) {
	return {
		fetchProjectData : function(beeboleToken, callback, onError) {
			console.log('real fetchProjectData');
			$http({
				method:'POST',
				url:'/api/monthSummary',
				data:{
					'month':this.month,
					'year': this.year,
					'beeboleToken': beeboleToken
				}
			})
			.success(function(data) {
				data.projects.forEach(function(elem){
					elem.timeWorked = elem.timeWorked+'h';
				});
				callback(data.projects);
			})
			.error(onError);
		}
	};
}]);

reackServices.factory('FinancialService', ['$http', function($http) {
	return {
		addData : function(projectEntry) {
			elem.dailyWage = config.dailyWage;
			elem.workerName = config.name;
			elem.sum = Calculation.calculate(config.dailyWage,elem.timeWorked);
			return projectEntry;
		}
	};
}]);


reackServices.factory('ReceiptGenerator', ['Persistence', 'Calculation', 'Timesheet', 'FinancialService', function(Persistence, Calculation, Timesheet, FinancialService) {
	return {
		generateReceipt : function() {
			var result = {};
			var config = Persistence.loadConfig();
			console.log('loaded config: ' + config);
			result.orderDate = new Date(this.year,this.month-1,1); //getMonthFirstDay(month);
			result.receiptDate = new Date(this.year,this.month,1); //getNextMonthFirstDay(month);
			result.startDate = new Date(this.year,this.month-1,1); //getMonthFirstDay(month);
			var endDate = new Date(this.year,this.month,1);
			endDate.setDate(endDate.getDate()-1);
			result.endDate = endDate;//getMonthLastDay(month);
			result.managerName = config.managerName;
			result.workerName = config.name;
			result.dailyWage = config.dailyWage;
			result.totalSum = 0;
			result.projects = [];

			result.loading = true;
			Timesheet.fetchProjectData(config.beeboleToken, function(elems) {
				elems.forEach(function (elem) {
					var entry = FinancialService.addData(elem);
					result.projects.push(entry);
					result.totalSum = result.totalSum + entry.sum;
				});
				result.loading = false;
			}, function() {
				result.failed = true;
			});

			return result;
		},

		month : 10,
		year : 2012
	};
}]);