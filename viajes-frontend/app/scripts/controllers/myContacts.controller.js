'use strict';
angular.module('iaw2017App')
  .controller('MyContactsCtrl', ['$location', '$scope', 'ContactService', function ( $location, $scope, ContactService) {

    $scope.contacts = [];

    function initialize() {
        ContactService.reset();
        ContactService.getContacts().then(function (contacts){
            $scope.contacts = contacts;
        });
    }

    initialize();

    $scope.goToNewContact = function() {
        $location.path('/newContact');
    };

    $scope.deleteContact = function(id) {
        ContactService.deleteContact(id).then(function(){
            initialize();
        });
    };

    $scope.editContact = function(id) {
        $location.path('/editContact/'+id);
    };

  }]);
