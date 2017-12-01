'use strict';
angular.module('viajesApp')
  .controller('BusquedaHotelSinUserCtrl', [ '$filter', '$location', '$scope', 'HotelService', 'CiudadService', 'UserService', function ( $filter, $location, $scope, HotelService, CiudadService, UserService) {

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

    $scope.isLoggedIn = function() {
        return UserService.isLoggedIn();
    };


    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];

        if (($scope.busqueda.destino)&&($scope.busqueda.fechaIngreso)&&($scope.busqueda.fechaSalida)){
            HotelService.reset();
            var estrellas =  ($scope.busqueda.estrellas)? $scope.busqueda.estrellas:99;
            console.log(estrellas);
            HotelService.getHoteles($scope.busqueda.destino._id,estrellas).then(function(response){

                // for (var i = 0; i < response.length; i++) {
                //     response[i].enCarrito = $scope.paquete.reservaHotel.filter(function(obj) {
                //         return obj.hotel === response[i]._id;
                //     })[0];
                // }
                // console.log(response);
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.irBusquedaAuto = function() {
        $location.path('/busquedaAuto');
    };

  }]);
