'use strict';
angular.module('viajesApp')
  .controller('BusquedaAutoSinUserCtrl', ['$location', '$scope', '$filter', 'AutoService', 'CiudadService', 'UserService', function ( $location, $scope, $filter, AutoService, CiudadService, UserService) {

    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];

    function initialize() {
        CiudadService.getCiudades().then(function(response){
            $scope.ciudades = response;
        });
    }

    initialize();

    $scope.isLoggedIn = function() {
        return UserService.isLoggedIn();
    }

    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];
        AutoService.reset();
        if (($scope.busqueda.lugarRetiro) && ($scope.busqueda.lugarDevolucion)){
            var fechaRetiro = $filter('date')($scope.busqueda.fechaRetiro, "dd-MM-yyyy");
            var fechaDevolucion = $filter('date')($scope.busqueda.fechaDevolucion, "dd-MM-yyyy");
            AutoService.getAutos($scope.busqueda.lugarRetiro._id, $scope.busqueda.lugarDevolucion._id, fechaRetiro, fechaDevolucion).then(function(response){
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.irBusquedaHoteles = function() {
        $location.path('/busquedaHotel');
    };

    $scope.irBusquedaVuelo = function() {
        $location.path('/busquedaVuelo');
    };
  }]);
