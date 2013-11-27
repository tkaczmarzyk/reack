'use strict';

angular.module('reack', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'reackServices'
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
      .otherwise({
        redirectTo: '/'
      });
  });
