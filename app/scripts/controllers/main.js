'use strict';

angular.module('reack.controllers', ['reack.filters','reackServices'])
  .controller('MainCtrl', ['$scope', 'Calculation', function ($scope, Calculation) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.sum = function () {
      return Calculation.calculate($scope.dailyWage, $scope.timeWorked) || 0;
    };

  }])
  .controller('ReceiptCtrl', ['$scope', 'Calculation', 'Persistence', function ($scope, Calculation, Persistence) {

    $scope.sum = function () {
      var projectSum = 0;
      $scope.project.data.forEach(function(entry){
        projectSum = projectSum + Calculation.calculate(entry.dailyWage, entry.timeWorked) || 0;
      });
      return projectSum;
    };

    $scope.sumProj = function (project) {
      return Calculation.calculate(project.dailyWage, project.timeWorked) || 0;
    };

    $scope.save = function (dailyWage) {
      Persistence.saveDailyWage(dailyWage);
    };

    $scope.saveProjectData = function () {
      Persistence.saveProjectData($scope.project);
    };
  }]);