'use strict';
angular.module('viajesApp')
  .controller('BusquedaVueloCtrl', ['$location', '$scope', 'VueloService', 'CiudadService', function ( $location, $scope, VueloService, CiudadService) {

    $scope.vuelos = [];
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

    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];
        VueloService.reset();
        if (($scope.busqueda.destino) && ($scope.busqueda.fecha)){
            VueloService.getVuelos($scope.busqueda.destino, $scope.busqueda.fecha).then(function(response){
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.agregarAlCarrito = function() {


    };

    $scope.quitarDelCarrito = function() {

    };

  }]);
