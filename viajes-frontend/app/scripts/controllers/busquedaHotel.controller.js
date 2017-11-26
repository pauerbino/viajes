'use strict';
angular.module('viajesApp')
  .controller('BusquedaHotelCtrl', [ '$filter', '$location', '$routeParams', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', 'UserService', function ( $filter, $location,  $routeParams, $scope, HotelService, CiudadService, PaqueteService, UserService) {

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

    $scope.isLoggedIn = function() {
        return UserService.isLoggedIn();
    }

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
