'use strict';
angular.module('iaw2017App')
  .controller('ListsCtrl', ['$location', '$scope', 'ListService', function ( $location, $scope, ListService) {

    $scope.lists = [];

    function initialize() {
        ListService.reset();
        ListService.getLists().then(function (lists){
            console.log(lists);
            $scope.lists = lists;
        });
    }

    initialize();

    $scope.goToNewList = function() {
        $location.path('/newList');
    };

    $scope.goToNewContact = function() {
        $location.path('/newContact');
    };

    $scope.goToList = function(list) {
        $location.path('/contactList/'+ list._id);
    };

  }]);
