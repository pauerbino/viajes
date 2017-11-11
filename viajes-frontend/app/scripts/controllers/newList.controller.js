'use strict';
angular.module('iaw2017App')
  .controller('NewListCtrl', ['$location', '$routeParams', '$scope', 'ContactService', 'ListService',
    function ( $location, $routeParams, $scope, ContactService, ListService) {

        function initialize() {
            ContactService.reset();
            ContactService.getContacts().then(function(response){
                $scope.allContacts = response;
            });
        }

        initialize();

        $scope.createList = function() {
            if ($scope.newListForm.$valid) {
                var contactsSelected = $scope.allContacts.filter(function(obj) {
                    if (obj.checked) {
                        return obj;
                    }
                });
                $scope.list.contacts = contactsSelected;
                ListService.createList($scope.list).then(function() {
                    $location.path('/lists');
                });
            }
        };

        $scope.goBack = function() {
            $location.path('/lists');
        };

  }]);
