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
    };

    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];

        if (($scope.busqueda.destino)&&($scope.busqueda.fechaIngreso)&&($scope.busqueda.fechaSalida)){
            PaqueteService.reset();
            PaqueteService.getPaquete($scope.idPaquete).then(function(resp){
                $scope.paquete = resp;
                HotelService.reset();
                var estrellas =  ($scope.busqueda.estrellas)? $scope.busqueda.estrellas:99;
                HotelService.getHoteles($scope.busqueda.destino._id,estrellas).then(function(response){
                    for (var i = 0; i < response.length; i++) {
                        response[i].enCarrito = false;
                    }
                    $scope.resultadoBusqueda = response;
                });
            });
        }
    };

    $scope.agregarAlCarrito = function(hotel) {
        var fechaIngreso = $filter('date')($scope.busqueda.fechaIngreso, "dd-MM-yyyy");
        var fechaSalida = $filter('date')($scope.busqueda.fechaSalida, "dd-MM-yyyy");
        PaqueteService.nuevaReservaHotel($scope.idPaquete, hotel._id, hotel.monto, fechaIngreso, fechaSalida).then(function(){
            PaqueteService.reset();
            hotel.enCarrito = true;
        });
    };

    $scope.irBusquedaAuto = function() {
        $location.path('/busquedaAuto/'+$scope.idPaquete);
    };

  }]);
