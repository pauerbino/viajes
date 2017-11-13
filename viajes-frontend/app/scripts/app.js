'use strict';

/**
 * @ngdoc overview
 * @name viajesApp
 * @description
 * # viajesApp
 *
 * Main module of the application.
 */
angular
  .module('viajesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/busquedaAuto', {
        templateUrl: 'views/busquedaAuto.html',
        controller: 'BusquedaAutoCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'vm'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .when('/logOut', {
        templateUrl: 'views/home.html',
        controller: 'LogOutCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
