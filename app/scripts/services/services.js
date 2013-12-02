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
				timeWorked:'160h'
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