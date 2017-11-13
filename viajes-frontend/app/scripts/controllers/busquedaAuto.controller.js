'use strict';
angular.module('viajesApp')
  .controller('BusquedaAutoCtrl', ['$location', '$scope', 'ReservaAutoService', function ( $location, $scope, ReservaAutoService) {

    $scope.autos = [];

    function initialize() {

    }

    initialize();

    $scope.agregarAlCarrito = function() {

    };

    $scope.quitarDelCarrito = function() {

    };

  }]);
