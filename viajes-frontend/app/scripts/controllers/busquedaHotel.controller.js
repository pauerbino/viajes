'use strict';
angular.module('viajesApp')
  .controller('BusquedaHotelCtrl', ['$location', '$scope', '$filter', 'HotelService', 'CiudadService', function ( $location, $scope, $filter, HotelService, CiudadService) {

    $scope.hoteles = [];
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
        console.log($scope.busqueda.fechaIngreso);
        console.log($scope.busqueda);
        console.log($filter('date')($scope.busqueda.fechaIngreso, "dd/MM/yyyy"));
        HotelService.reset();
        if (($scope.busqueda.destino) && ($scope.busqueda.estrellas)){
            HotelService.getHoteles($scope.busqueda.destino._id, $scope.busqueda.estrellas).then(function(response){
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.agregarAlCarrito = function() {
    };

    $scope.quitarDelCarrito = function() {
    };

  }]);
