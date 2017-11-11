'use strict';
angular.module('iaw2017App')
  .controller('NewCampaignCtrl', ['$location', '$scope', 'CampaignService', 'ListService', function ( $location, $scope, CampaignService, ListService) {

    $scope.lists = [];
    $scope.selectedListId = '';
    $scope.campaign = {
        title: "",
        subject: "",
        from: "",
        list: {},
        content: "",
        participants: 0
    };

    function initialize() {
        ListService.getLists().then(function (lists){
            $scope.lists = lists;
        });
    }

    initialize();

    $scope.newCampaign = function(campaign) {
        if ($scope.newCampaignForm.$valid) {
            ListService.getList($scope.selectedListId).then(function(list) {
                $scope.campaign.participants = list.contacts.length;
                $scope.campaign.list = $scope.selectedListId;
                CampaignService.newCampaign($scope.campaign).then(function(result) {
                    console.log(campaign);
                    $location.path('/myCampaigns');
                });
            });
        }
    };

  }]);
