'use strict';

angular.module('reack')
  .controller('MainCtrl', function ($scope, Calculation) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.sum = function () {
      return Calculation.calculate($scope.dailyWage, $scope.timeWorked) | 0;
    };
  });
