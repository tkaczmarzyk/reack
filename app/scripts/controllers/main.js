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

    $scope.config = Persistence.loadConfig();
    $scope.projects = Persistence.loadProjectData();

    $scope.sum = function () {
      var projectSum = 0;
      $scope.projects.forEach(function(entry){
        projectSum = projectSum + Calculation.calculate($scope.config.dailyWage, entry.timeWorked) || 0;
      });
      return projectSum;
    };

    $scope.sumProj = function (project) {
      return Calculation.calculate($scope.config.dailyWage, project.timeWorked) || 0;
    };

  }])
  .controller('ConfigCtrl', ['$scope', 'Persistence', function ($scope, Persistence) {

    $scope.config = Persistence.loadConfig();

    $scope.save = function () {
      Persistence.saveConfig($scope.config);
    };

  }]);