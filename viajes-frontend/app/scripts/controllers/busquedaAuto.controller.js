'use strict';
angular.module('viajesApp')
  .controller('BusquedaAutoCtrl', ['$location', '$routeParams', '$scope', '$filter', 'AutoService', 'CiudadService', function ( $location, $routeParams, $scope, $filter, AutoService, CiudadService) {

    $scope.autos = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.paqueteActual = $routeParams.idPaquete;
    function initialize() {
        CiudadService.getCiudades().then(function(response){
            $scope.ciudades = response;
        });
       // PaqueteService.getPaquete($scope.paqueteActual).then(function(response){

        //});
    }

    initialize();

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

    $scope.agregarAlCarrito = function() {


    };

    $scope.quitarDelCarrito = function() {

    };

  }]);
