'use strict';

angular.module('reack.controllers', ['reack.filters','reackServices'])
  .controller('MainCtrl', ['$scope', 'Calculation', 'ReceiptGenerator', 'Persistence', function ($scope, Calculation, ReceiptGenerator, Persistence) {

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

    $scope.isConfigured = function() {
      var config = Persistence.loadConfig();
      if(config.beeboleToken && config.beeboleToken !== ""){
        return true;
      } else {
        return false;
      }
    }

    $scope.buttonLink = $scope.isConfigured() ? "#/receipt2" : "#/config";

    $scope.buttonText = $scope.isConfigured() ? "Generuj odbiór!" : "Skonfiguruj aplikację";

    $scope.sum = function () {
      return Calculation.calculate($scope.dailyWage, $scope.timeWorked) || 0;
    };

    $scope.setValues = function(){
      $scope.buttonLink = $scope.buttonLink+'?month='+$scope.month.value+'&year='+$scope.year.value;
      if($scope.additionalCost){
        $scope.buttonLink = $scope.buttonLink+'&additionalCost='+$scope.additionalCost;
      } else {
        $scope.additionalCost = undefined;
      }
    };

  }])
  .controller('ReceiptCtrl', ['$scope', 'Calculation', 'ReceiptGenerator', '$routeParams', function ($scope, Calculation, ReceiptGenerator, $routeParams) {

    ReceiptGenerator.month=$routeParams.month;
    ReceiptGenerator.year=$routeParams.year;
    if($routeParams.additionalCost){
      ReceiptGenerator.additionalCost = $routeParams.additionalCost;
    }
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