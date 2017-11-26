'use strict';
angular.module('viajesApp')
  .controller('MiCarritoCtrl', [ '$filter', '$location', '$routeParams', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', function ( $filter, $location,  $routeParams, $scope, HotelService, CiudadService, PaqueteService) {

    $scope.hoteles = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete = $routeParams.idPaquete;
    $scope.paquete = null;

    function initialize() {
        PaqueteService.getPaquete($scope.idPaquete).then(function(response){
            $scope.paquete = response;
        });
    }

    initialize();


  }]);
