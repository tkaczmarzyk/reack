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
				projectCode:'Strike Team',
				timeWorked:'160h',
				contractedTime:'150h'
			},{
				projectCode:'Wyceny',
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

reackServices.factory('ReceiptGenerator', ['Persistence','Calculation','$http',function(Persistence,Calculation,$http) {
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

			$http({
				method:'POST',
				url:'/api/monthSummary',
				data:{
					'month':this.month,
					'year': this.year,
					'beeboleToken':config.beeboleToken
				}
			})
			.success(function(data) {
				result.projects = data.projects;
				data.projects.forEach(function(elem){
					elem.timeWorked = elem.timeWorked+'h';
					elem.dailyWage = config.dailyWage;
					elem.workerName = config.name;
					elem.sum = Calculation.calculate(config.dailyWage,elem.timeWorked);
					result.totalSum = result.totalSum + elem.sum;
				});
			});

			result.totalSum = 0;
			return result;
		},

		month : 10,
		year : 2012
	};
}]);