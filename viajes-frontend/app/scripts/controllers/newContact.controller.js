'use strict';
angular.module('iaw2017App')
  .controller('NewContactCtrl', ['$location', '$scope', 'ContactService',
    function ( $location, $scope, ContactService) {

        $scope.contact = {
            name: '',
            lastName: '',
            email: '',
            phone: '',
            tags: []
        };

        $scope.userExist = false;
        $scope.newTag = '';

        $scope.newContact = function() {
            if ($scope.newContactForm.$valid) {
                ContactService.existContact($scope.contact).then(function(response){
                    if (response) {
                        $scope.userExist = true;
                    } else {
                        ContactService.createContact($scope.contact).then(function() {
                            $location.path('/myContacts');
                        });
                    }
                });
            }
        };

        $scope.goBack = function() {
            $location.path('/myContacts');
        };

        $scope.addTag = function() {
            if ($scope.contact.tags.indexOf($scope.newTag) === -1) {
                $scope.contact.tags.push($scope.newTag);
                $scope.newTag = "";
            }
        };

        $scope.removeTag = function(tag) {
            $scope.contact.tags.splice($scope.contact.tags.indexOf(tag), 1);
        };

  }]);
