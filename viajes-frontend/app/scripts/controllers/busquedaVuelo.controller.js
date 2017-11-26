'use strict';
angular.module('viajesApp')
  .controller('BusquedaVueloCtrl', ['$location', '$scope', '$filter', 'VueloService', 'CiudadService', function ( $location, $scope, $filter, VueloService, CiudadService) {

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
        if (($scope.busqueda.origen) && ($scope.busqueda.destino) &&($scope.busqueda.fecha)){
            var fecha = $filter('date')($scope.busqueda.fecha, "dd-MM-yyyy");
            VueloService.getVuelos($scope.busqueda.origen._id, $scope.busqueda.destino._id, fecha).then(function(response){
                console.log(response);
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.agregarAlCarrito = function(vuelo) {
        PaqueteService.nuevaReservaVuelo($scope.idPaquete, vuelo._id, vuelo.monto).then(function(response){
            PaqueteService.reset();
            PaqueteService.getPaquete($scope.idPaquete).then(function(resp){
                console.log(resp);
            });
        });

    };

    $scope.quitarDelCarrito = function() {

    };

  }]);
