'use strict';
angular.module('viajesApp')
  .controller('BusquedaVueloSinUserCtrl', [ '$filter', '$location', '$scope', 'AerolineaService', 'CiudadService', 'UserService', 'VueloService', function ( $filter, $location, $scope, AerolineaService, CiudadService, UserService, VueloService) {

    $scope.busqueda = {};
    $scope.ciudades = [];
    $scope.aerolineas = [];
    $scope.ciudad = {};
    $scope.resultadoBusqueda = [];

    function initialize() {
        CiudadService.getCiudades().then(function(response){
            $scope.ciudades = response;
        });
        AerolineaService.getAerolineas().then(function(response){
            $scope.aerolineas = response;
        });
    }

    initialize();

    $scope.isLoggedIn = function() {
        return UserService.isLoggedIn();
    }

    $scope.buscar = function() {
        $scope.resultadoBusqueda = [];
        var aerolineaId;
        VueloService.reset();
        if (($scope.busqueda.origen) && ($scope.busqueda.destino) &&($scope.busqueda.fecha)){
            var fecha = $filter('date')($scope.busqueda.fecha, "dd-MM-yyyy");
            if ($scope.busqueda.aerolinea == null) aerolineaId = 99;
            else aerolineaId = $scope.busqueda.aerolinea._id;
            VueloService.getVuelos($scope.busqueda.origen._id, $scope.busqueda.destino._id, fecha, aerolineaId).then(function(response){
                $scope.resultadoBusqueda = response;
            });
        }
    };

    $scope.irBusquedaAuto = function() {
        $location.path('/busquedaAuto');
    };

  }]);
