'use strict';
angular.module('iaw2017App')
  .controller('MainCtrl', ['$rootScope','$scope', 'UserService',
    function ($rootScope, $scope, UserService) {

    $scope.isLoggedIn = false;
    function initialize() {
        $scope.isLoggedIn = UserService.isLoggedIn();
    }
    $rootScope.$on('updateNavigation', initialize);
    initialize();

  }]);
