'use strict';
angular.module('viajesApp')
  .controller('HomeCtrl', ['$location', '$scope', 'PaqueteService', 'UserService',
    function ($location, $scope, PaqueteService, UserService) {

    $scope.isLoggedIn = false;

    function initialize() {
        $scope.isLoggedIn = UserService.isLoggedIn();
    }

    $scope.buscarAutos = function() {
        if ($scope.isLoggedIn) {
            PaqueteService.getPaqueteActual().then(function(response){
                $location.path('/busquedaAuto/'+response._id);
            });
        } else {
            $location.path('/busquedaAuto');
        };
    }

    $scope.buscarHoteles = function() {
        if ($scope.isLoggedIn) {
            PaqueteService.getPaqueteActual().then(function(response){
                $location.path('/busquedaHotel/'+response._id);
            });
        } else {
            $location.path('/busquedaHotel');
        };
    }

    $scope.buscarVuelos = function() {
        if ($scope.isLoggedIn) {
            PaqueteService.getPaqueteActual().then(function(response){
                $location.path('/busquedaVuelo/'+response._id);
            });
        } else {
            $location.path('/busquedaVuelo');
        };
    }

    initialize();

  }]);
