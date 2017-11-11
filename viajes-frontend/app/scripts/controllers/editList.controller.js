'use strict';
angular.module('iaw2017App')
  .controller('EditListCtrl', ['$location', '$routeParams', '$scope', 'ContactService', 'ListService',
    function ( $location, $routeParams, $scope, ContactService, ListService) {

        $scope.allContacts = [];
        $scope.list = {};

        function initialize() {
            ContactService.reset();
            ContactService.getContacts().then(function(response){
                $scope.allContacts = response;
            });

            ListService.getList($routeParams.id).then(function(response){
                $scope.list = response;

                for (var i = 0; i < $scope.allContacts.length; i++) {
                    if (isIncluded($scope.allContacts[i])) {
                        $scope.allContacts[i].checked = true;
                    }
                }
            });
        }

        initialize();

        $scope.editList = function() {
            var contactsSelected = $scope.allContacts.filter(function(obj) {
                if (obj.checked) {
                    return obj;
                }
            });
            $scope.list.contacts = contactsSelected;
            ListService.editList($scope.list).then(function() {
                $location.path('/contactList/'+$routeParams.id);
            });
        };

        $scope.goBack = function() {
            $location.path('/contactList/'+$routeParams.id);
        };

        function isIncluded(obj) {
            var bool = false;
            for (var i = 0; i < $scope.list.contacts.length; i++) {
                if ($scope.list.contacts[i]._id === obj._id) {
                    bool = true;
                    return bool;
                }
            }
            return bool;
        }

  }]);
