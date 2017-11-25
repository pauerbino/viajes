'use strict';
angular.module('viajesApp')
    .service('PaqueteService', ['$http', '$q', 'Configuration', function ($http, $q, Configuration) {
        var service = {};
        var cache = {
            paquete: null
        };

        service.reset = function() {
            cache = {
                paquete: null
            };
        };

        service.getPaquetes = function(destino, estrellas) {
            var deferred = $q.defer();
            if (cache.paquete) {
                deferred.resolve(cache.paquete);
            } else {
                $http({
                    method: 'GET',
                    url: Configuration.getConfiguration().baseURL + '/paquetes'
                }).then(function (response) {
                    cache.paquete = response.data;
                    deferred.resolve(response.data);
                }).catch(function (response) {
                    deferred.reject(response);
                });
            }

            return deferred.promise;
        };

        service.getPaquete = function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Configuration.getConfiguration().baseURL + '/paquetes/' + id
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.nuevaReservaHotel = function(idPaquete, hotel, monto) {
            var deferred = $q.defer();
            var body = {
                idPaquete: idPaquete,
                hotel: hotel,
                monto: monto
            };

            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/paquetes/ReservaHotel',
                data: body
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.nuevaReservaVuelo = function(idPaquete, vuelo, monto) {
            var deferred = $q.defer();
            var body = {
                idPaquete: idPaquete,
                vuelo: vuelo,
                monto: monto
            };

            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/paquetes/ReservaVuelo',
                data: body
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        service.nuevaReservaAuto = function(idPaquete, auto, monto, lugarRetiro, lugarDevolucion) {
            var deferred = $q.defer();
            var body = {
                idPaquete: idPaquete,
                auto: auto,
                monto: monto,
                lugarRetiro: lugarRetiro,
                lugarDevolucion: lugarDevolucion
            };

            $http({
                method : 'POST',
                url : Configuration.getConfiguration().baseURL + '/paquetes/ReservaAuto',
                data: body
            }).then(function(response) {
                deferred.resolve(response);
            }).catch(function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };
        return service;
    }]);
