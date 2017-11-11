'use strict';
angular.module('iaw2017App')
  .controller('EditCampaignCtrl', ['$location', '$routeParams', '$scope', 'CampaignService', 'ListService', function ( $location, $routeParams, $scope, CampaignService, ListService) {

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
            CampaignService.getCampaign($routeParams.id).then(function (campaign){
                $scope.campaign = campaign;
                console.log(campaign);
                // $scope.selectedListId = campaign.list;
                $scope.lists = lists;
            });
        });
    }

    initialize();

    $scope.saveCampaign = function(campaign) {
        if ($scope.editCampaignForm.$valid) {
            ListService.getList($scope.selectedListId).then(function(list) {
                $scope.campaign.participants = list.contacts.length;
                $scope.campaign.list = list;
                CampaignService.editCampaign($scope.campaign).then(function(result) {
                    $location.path('/myCampaigns');
                });
            });
        }
    };

  }]);
