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
		loadDailyWage : function() {
			return dailyWage;
		},
		saveDailyWage : function(wage) {
			dailyWage = wage;
		},
		loadProjectData : function() {
			return [{
				name:'Strike Team',
				timeWorked:'160h',
				contractedTime:'150h'
			},{
				name:'Wyceny',
				timeWorked:'2'
			}];
			// return JSON.parse(localStorage.projectData);
		},
		saveProjectData : function(data) {
			localStorage.projectData = JSON.stringify(data);
		},
		loadConfig : function() {
			var config = localStorage.config;
			return config ? JSON.parse(localStorage.config) : {};
		},
		saveConfig : function(config) {
			localStorage.config = JSON.stringify(config);
		}
	};
});

reackServices.factory('Timesheet', function() {

});

reackServices.factory('ReceiptGenerator', ['Persistence','Calculation',function(Persistence,Calculation) {
	return {
		generateReceipt : function(/*year, month*/) {
			var result = {};
			var config = Persistence.loadConfig();
			result.orderDate = '1-11-2013'; //getMonthFirstDay(month);
			result.receiptDate = '1-12-2013'; //getNextMonthFirstDay(month);
			result.startDate = '1-11-2013'; //getMonthFirstDay(month);
			result.endDate = '30-11-2013'; //getMonthLastDay(month);
			result.managerName = config.managerName;
			result.workerName = config.name;
			result.dailyWage = config.dailyWage;
			result.projects = Persistence.loadProjectData();
			result.totalSum = 0;
			result.projects.forEach(function(elem){
				elem.dailyWage = config.dailyWage;
				elem.workerName = config.name;
				elem.sum = Calculation.calculate(config.dailyWage,elem.timeWorked);
				result.totalSum = result.totalSum + elem.sum;
			});
			return result;
		}
	};
}]);