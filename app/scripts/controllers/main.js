'use strict';

angular.module('reack.controllers', ['reack.filters','reackServices'])
  .controller('MainCtrl', ['$scope', 'Calculation', 'ReceiptGenerator', function ($scope, Calculation, ReceiptGenerator) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.months = [{name:'styczeń',value:1},{name:'luty',value:2},{name:'marzec',value:3},{name:'kwiecień',value:4},{name:'maj',value:5},{name:'czerwiec',value:6},{name:'lipiec',value:7},{name:'sierpień',value:8},{name:'wrzesień',value:9},{name:'październik',value:10},{name:'listopad',value:11},{name:'grudzień',value:12}];

    $scope.years = [{name:'2013',value:2013},{name:'2014',value:2014}];

    $scope.initMonth = function() {
      $scope.months.forEach(function(elem){
        if(elem.value === new Date().getMonth() ){
          $scope.month = elem;
        }
      });
    }

    $scope.initYear = function() {
      $scope.years.forEach(function(elem) {
        if(elem.value === new Date().getFullYear()){
          $scope.year = elem;
        }
      })
    }

    $scope.sum = function () {
      return Calculation.calculate($scope.dailyWage, $scope.timeWorked) || 0;
    };

    $scope.setValues = function(){
      ReceiptGenerator.month = $scope.month.value;
      ReceiptGenerator.year = $scope.year.value;
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
      toaster.pop('success', 'Success', 'The config has been successfuly updated, my master!');
    };
  }])
  .controller('HelloCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http({ method: 'GET', url: '/api/hello?name=' + $routeParams.name}).success(function(data) {
      $scope.message = data;
    });
    
  }]);