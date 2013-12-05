'use strict';

angular.module('reack.controllers', ['reack.filters','reackServices'])
  .controller('MainCtrl', ['$scope', 'Calculation', function ($scope, Calculation) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.months = [{name:'styczeń'},{name:'luty'},{name:'marzec'},{name:'kwiecień'},{name:'maj'},{name:'czerwiec'},{name:'lipiec'},{name:'sierpień'},{name:'wrzesień'},{name:'październik'},{name:'listopad'},{name:'grudzień'}];

    $scope.years = [{name:2013},{name:2014}];

    $scope.sum = function () {
      return Calculation.calculate($scope.dailyWage, $scope.timeWorked) || 0;
    };

  }])
  .controller('ReceiptCtrl', ['$scope', 'Calculation', 'ReceiptGenerator', function ($scope, Calculation, ReceiptGenerator) {

    var result = ReceiptGenerator.generateReceipt();
    $scope.receiptData = result;

  }])
  .controller('ConfigCtrl', ['$scope', 'Persistence', 'toaster', function ($scope, Persistence, toaster) {

    $scope.config = Persistence.loadConfig();

    $scope.save = function () {
      Persistence.saveConfig($scope.config);
      toaster.pop('success', "Success", "The config has been successfuly updated, my master!");
    };
  }])
  .controller('HelloCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http({ method: 'GET', url: '/api/hello?name=' + $routeParams.name}).success(function(data) {
      $scope.message = data;
    });
    
  }]);