'use strict';
angular.module('viajesApp')
  .controller('LoginCtrl', ['$location', '$scope', 'UserService', function ( $location, $scope, UserService) {

    $scope.credentials = {
      email : "",
      password : ""
    };

    $scope.login = function() {
        if ($scope.loginForm.$valid) {
            UserService.login($scope.credentials).then(function(){
              $location.path('/lists');
            }).catch(function(res){
                console.log(res);
            });
        }
    };

  }]);
