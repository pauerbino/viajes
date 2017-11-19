'use strict';
angular.module('viajesApp')
  .controller('BusquedaAutoCtrl', ['$location', '$scope', 'AutoService', 'CiudadService', function ( $location, $scope, AutoService, CiudadService) {

    $scope.autos = [];
    $scope.busqueda = {};
    $scope.ciudades = [];
    // $scope.ciudades = [
    //                     { nombre:"Buenos Aires", pais: "Argentina"},
    //                     { nombre:"Nueva York", pais: "Estados Unidos"},
    //                     { nombre:"Paris", pais: "Francia"}
    //                 ];

    $scope.ciudad = {};

    function initialize() {
        CiudadService.getCiudades().then(function(response){
            $scope.ciudades = response;
        });
    }

    initialize();

    $scope.agregarAlCarrito = function() {

    };

    $scope.quitarDelCarrito = function() {

    };

  }]);
