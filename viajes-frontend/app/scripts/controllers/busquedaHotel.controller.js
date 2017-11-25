'use strict';
angular.module('viajesApp')
  .controller('BusquedaHotelCtrl', ['$location', '$routeParams', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', function ( $location,  $routeParams, $scope, HotelService, CiudadService, PaqueteService) {

    $scope.hoteles = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete = $routeParams.idPaquete;

    function initialize() {
        CiudadService.getCiudades().then(function(response){
            $scope.ciudades = response;
        });
    }

    initialize();

    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];
        HotelService.reset();
        if (($scope.busqueda.destino) && ($scope.busqueda.estrellas)){
            HotelService.getHoteles($scope.busqueda.destino._id, $scope.busqueda.estrellas).then(function(response){
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.agregarAlCarrito = function(hotel) {
        PaqueteService.nuevaReservaHotel($scope.idPaquete, hotel._id, hotel.monto).then(function(response){
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
