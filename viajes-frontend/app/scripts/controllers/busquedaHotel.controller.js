'use strict';
angular.module('viajesApp')
  .controller('BusquedaHotelCtrl', [ '$filter', '$location', '$routeParams', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', 'UserService', function ( $filter, $location,  $routeParams, $scope, HotelService, CiudadService, PaqueteService, UserService) {

    $scope.hoteles = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete = $routeParams.idPaquete;
    $scope.paquete = null;

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
        if (($scope.busqueda.destino) && ($scope.busqueda.estrellas)){
            PaqueteService.reset();
            PaqueteService.getPaquete($scope.idPaquete).then(function(response){
                $scope.paquete = response;
                HotelService.reset();
                HotelService.getHoteles($scope.busqueda.destino._id, $scope.busqueda.estrellas).then(function(response){

                    // for (var i = 0; i < response.length; i++) {
                    //     response[i].enCarrito = $scope.paquete.reservaHotel.filter(function(obj) {
                    //         return obj.hotel === response[i]._id;
                    //     })[0];
                    // }
                    // console.log(response);
                    $scope.resultadoBusqueda = response;
                });
            });
        }
    };

    $scope.agregarAlCarrito = function(hotel) {
        PaqueteService.nuevaReservaHotel($scope.idPaquete, hotel._id, hotel.monto).then(function(response){
            // hotel.enCarrito = true;
            PaqueteService.reset();
            PaqueteService.getPaquete($scope.idPaquete).then(function(resp){
            });
        });
    };

    $scope.quitarDelCarrito = function() {
    };

  }]);
