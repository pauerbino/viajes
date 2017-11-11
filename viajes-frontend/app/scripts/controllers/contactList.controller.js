'use strict';
angular.module('iaw2017App')
  .controller('ContactListCtrl', ['$location', '$routeParams', '$scope', 'ListService',
    function ( $location, $routeParams, $scope, ListService) {

    $scope.list = {};

    function initialize() {
        ListService.getList($routeParams.id).then(function (list){
            $scope.list = list;
        });
    }

    initialize();

    $scope.deleteList = function() {
        ListService.deleteList($routeParams.id).then(function (){
            $location.path('/lists');
        });
    };

    $scope.editList = function() {
        $location.path('/editList/'+$routeParams.id);
    };

    $scope.deleteContactFromList = function(id) {
        ListService.deleteContactFromList($routeParams.id, id).then(function (){
            initialize();
        });
    };

    $scope.editContactFromList = function(id) {
       $location.path('/editContact/'+ id);
    };

    $scope.goBack = function() {
       $location.path('/lists');
    };
  }]);
