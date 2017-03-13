var myApp = angular.module('myApp', ['ngYoutubeEmbed']);

myApp.controller('myCtrl', ['$scope', 'ngYoutubeEmbedService',  function($scope, ngYoutubeEmbedService) {

    $scope.video1 = 'https://www.youtube.com/watch?v=E813VYySueM';

    $scope.video2 = 'https://www.youtube.com/watch?v=SCVvhUW7cxo';

    $scope.video3 = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';

    $scope.video4 = 'https://gaming.youtube.com/watch?v=P_XwcUdSS1M';

    $scope.video5 = 'https://www.youtube.com/watch?v=OCmBWOF1A0g';

    $scope.playVideo = function() {
        var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
        player.playVideo();
    };

    $scope.showVideoInfo = function() {
        var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
        player.showVideoInfo();
    };

    $scope.stateChanged = function(e) {
        console.log(e);
    };
}]);
