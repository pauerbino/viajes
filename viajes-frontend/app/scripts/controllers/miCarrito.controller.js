'use strict';
angular.module('viajesApp')
  .controller('MiCarritoCtrl', [ '$filter', '$location', '$routeParams', '$scope', 'HotelService', 'CiudadService', 'PaqueteService', 'UserService', function ( $filter, $location,  $routeParams, $scope, HotelService, CiudadService, PaqueteService, UserService) {

    $scope.hoteles = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];
    $scope.idPaquete; // = $routeParams.idPaquete;
    $scope.paquete = null;

    $scope.currentUser = {
        email : "",
        name : ""
    }

    function initialize() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            if($routeParams.idPaquete){
                $scope.idPaquete = $routeParams.idPaquete;
                PaqueteService.getPaquete($scope.idPaquete).then(function(response){
                    $scope.paquete = response;
                    console.log(response);
                });
            }
            else {
                PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                    console.log(response);
                    $scope.paquete = response;
                    $scope.idPaquete = $scope.paquete._id;
                    console.log($scope.paquete);
                });
            }
        }
        else {
            //ACCESO PROHIBIDO
            console.log("aCCESO PROHUBIDO");
            $location.path('/busquedaAuto');
        }
    }

    initialize();

    $scope.pagar = function() {
        PaqueteService.pagarPaquete($scope.idPaquete).then(function(response){
            initialize();
        });
    }

    $scope.buscarAutos = function() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                $location.path('/busquedaAuto/'+response._id);
            });
        } else {
            $location.path('/busquedaAuto');
        };
    }

    $scope.buscarHoteles = function() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                $location.path('/busquedaHotel/'+response._id);
            });
        } else {
            $location.path('/busquedaHotel');
        };
    }

    $scope.buscarVuelos = function() {
        if (UserService.isLoggedIn()) {
            $scope.currentUser = UserService.currentUser();
            PaqueteService.getPaqueteActual($scope.currentUser.email).then(function(response){
                $location.path('/busquedaVuelo/'+response._id);
            });
        } else {
            $location.path('/busquedaVuelo');
        };
    }

    $scope.quitarVueloDelCarrito = function(reserva) {
        PaqueteService.quitarVueloDelPaquete(reserva._id, $scope.idPaquete).then(function(response){
            initialize();
        });
    }

    $scope.quitarHotelDelCarrito = function(reserva) {
        PaqueteService.quitarHotelDelPaquete(reserva._id, $scope.idPaquete).then(function(response){
            initialize();
        });
    }

    $scope.quitarAutoDelCarrito = function(reserva) {
        PaqueteService.quitarAutoDelPaquete(reserva._id, $scope.idPaquete).then(function(response){
            initialize();
        });
    }

  }]);
