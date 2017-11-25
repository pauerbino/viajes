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

        return service;
    }]);
