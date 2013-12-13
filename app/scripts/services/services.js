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
	return {
		loadConfig : function() {
			var config = localStorage.config;
			return config ? JSON.parse(localStorage.config) : { multisport: 'brak' };
		},
		saveConfig : function(config) {
			localStorage.config = JSON.stringify(config);
		}
	};
});

reackServices.factory('Timesheet', ['$http', function($http) {
	return {
		fetchProjectData : function(requestData, callback, onError) {
			console.log('real fetchProjectData');
			$http({
				method:'POST',
				url:'api/monthSummary',
				data:requestData
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

reackServices.factory('FinancialService', ['$http','Calculation', function($http,Calculation) {
	return {
		addData : function(projectEntry,config) {
			projectEntry.dailyWage = config.dailyWage;
			projectEntry.workerName = config.name;
			projectEntry.sum = Calculation.calculate(config.dailyWage,projectEntry.timeWorked);
			return projectEntry;
		}
	};
}]);


reackServices.factory('ReceiptGenerator', ['Persistence', 'Calculation', 'Timesheet', 'FinancialService', function(Persistence, Calculation, Timesheet, FinancialService) {
	return {
		generateReceipt : function() {
			var result = {};
			var config = Persistence.loadConfig();
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
			if (config.multisport === 'classic') {
				result.projects.push({
					projectCode: 'Cohesiva:Fit',
					workerName: config.name,
					dailyWage: 61.46,
					timeWorked: 1,
					sum: 61.46
				});
				result.totalSum = 61.46;
			} else if (config.multisport === 'plus') {
				result.projects.push({
					projectCode: 'Cohesiva:Fit',
					workerName: config.name,
					dailyWage: 69.76,
					timeWorked: 1,
					sum: 69.76
				});
				result.totalSum = 69.76;
			}

			result.loading = true;
			var requestData = {
				beeboleToken:config.beeboleToken,
				month:this.month,
				year:this.year
			};
			Timesheet.fetchProjectData(requestData, function(elems) {
				elems.forEach(function (elem) {
					var entry = FinancialService.addData(elem,config);
					result.projects.push(entry);
					result.totalSum = result.totalSum + entry.sum;
				});
				result.loaded = true;
			}, function() {
				result.failed = true;
			});

			if(this.additionalCost){
				result.projects.push({
					projectCode: 'Koszty dodatkowe',
					sum: this.additionalCost					
				});
				result.totalSum = result.totalSum + parseFloat(this.additionalCost);
			}

			return result;
		}
	};
}]);