'use strict';
angular.module('iaw2017App')
  .controller('SigninCtrl', ['$location', '$scope', 'UserService', function ($location, $scope, UserService) {

    $scope.credentials = {
      name : "",
      email : "",
      password : ""
    };

    $scope.register = function() {
        if ($scope.signinForm.$valid) {
            UserService.register($scope.credentials).then(function(){
              $location.path('/lists');
            }).catch(function(res){
                console.log(res);
            });
        }
    };

  }]);
