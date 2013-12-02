'use strict';

angular.module('reack', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'reackServices',
  'reack.filters',
  'reack.controllers'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'MainCtrl'
      })
      .when('/receipt', {
        templateUrl: 'views/receipt.html',
        controller: 'MainCtrl'
      })
      .when('/receipt2', {
        templateUrl: 'views/receipt2.html',
        controller: 'ReceiptCtrl'
      })
      .when('/config', {
        templateUrl: 'views/config.html',
        controller: 'ConfigCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($window) {
    var _ = $window._;
    _.mixin(_.str.exports());
    console.log('global initialization done');
  });