'use strict';

angular.module('reack')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.sum = function() {
        return $scope.timeWorked*$scope.dailyWage;
      };
  });
