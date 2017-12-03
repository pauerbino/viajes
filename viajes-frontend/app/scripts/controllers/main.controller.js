'use strict';
angular.module('viajesApp')
  .controller('MainCtrl', ['$rootScope','$scope', 'UserService',
    function ($rootScope, $scope, UserService) {

    $scope.isLoggedIn = false;

    function initialize() {
        $scope.isLoggedIn = UserService.isLoggedIn();
    }

    $rootScope.$on('updateNavigation', initialize);
    initialize();

    $scope.pagarPaquete = function() {
        $rootScope.$emit('pagarPaquete');
    };
  }]);
