'use strict';
angular.module('iaw2017App')
  .controller('MyCampaignsCtrl', ['$location', '$scope', 'CampaignService', function ( $location, $scope, CampaignService) {

    $scope.campaigns = [];

    function initialize() {
        CampaignService.reset();
        CampaignService.getCampaigns().then(function (campaigns){
            $scope.campaigns = campaigns;
        });
    }

    initialize();

    $scope.deleteCampaign = function(campaignId) {
        CampaignService.deleteCampaign(campaignId).then(function (){
            initialize();
        });
    };

    $scope.editCampaign = function(campaignId) {
        $location.path('/editCampaign/'+campaignId);
    };

    $scope.goToNewCampaign = function() {
        $location.path('/newCampaign');
    };

  }]);
