'use strict';
angular.module('viajesApp')
  .controller('BusquedaAutoCtrl', ['$location', '$routeParams', '$scope', 'AutoService', 'CiudadService', 'PaqueteService', function ( $location, $routeParams, $scope, AutoService, CiudadService, PaqueteService) {

    $scope.autos = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete = $routeParams.idPaquete;
    function initialize() {
        CiudadService.getCiudades().then(function(response){
            $scope.ciudades = response;
        });
        PaqueteService.getPaquete($scope.idPaquete).then(function(response){

        });
    }

    initialize();

    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];
        AutoService.reset();
        if (($scope.busqueda.lugarRetiro) && ($scope.busqueda.lugarDevolucion)){
            AutoService.getAutos($scope.busqueda.lugarRetiro._id, $scope.busqueda.lugarDevolucion._id).then(function(response){
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.agregarAlCarrito = function(auto) {
        PaqueteService.nuevaReservaAuto($scope.idPaquete, auto._id, auto.monto, $scope.busqueda.lugarRetiro._id, $scope.busqueda.lugarDevolucion._id).then(function(response){
            console.log(response);
            PaqueteService.reset();
            PaqueteService.getPaquete($scope.idPaquete).then(function(resp){
                console.log(resp);
            });
        });
    };

    $scope.quitarDelCarrito = function() {

    };

  }]);
