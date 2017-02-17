var myApp = angular.module('myApp', ['ngYoutubeEmbed']);

myApp.controller('myCtrl', ['$scope', '$window', 'ngYoutubeEmbedService',  function($scope, $window, ngYoutubeEmbedService) {

    $scope.videoForm = {};
    $scope.link1 = 'C5zzVemi3m4';
    $scope.link2 = 'https://www.youtube.com/watch?v=E813VYySueM';
    $scope.link3 = 'https://www.youtube.com/watch?v=SCVvhUW7cxo';
    $scope.link4 = 'https://gaming.youtube.com/watch?v=kNcFa3Xuk5U';
    $scope.link5 = 'https://gaming.youtube.com/watch?v=1pxAXJNJ-z8';

    $scope.ready = function(e) {
        var player = ngYoutubeEmbedService.getPlayerById('youtube-video');
        console.log(player);
        console.log('Player ready');
    };

    $scope.stateChanged = function(e) {
        var player = ngYoutubeEmbedService.getPlayerById('youtube-video');
        console.log(player);
        console.log('Player state changed');
    };

    $scope.qualityChanged = function(e) {
        var player = ngYoutubeEmbedService.getPlayerById('youtube-video');
        console.log(player);
        console.log('Player quality changed');
    };

    $scope.rateChanged = function(e) {
        var player = ngYoutubeEmbedService.getPlayerById('youtube-video');
        console.log(player);
        console.log('Player rate changed');
    };

    $scope.errored = function(e) {
        console.log(e);
    };

    $scope.apiChanged = function(e) {
        var player = ngYoutubeEmbedService.getPlayerById('youtube-video');
        console.log(player);
        console.log('Api changed');
    };

    $scope.play = function() {
        var player = ngYoutubeEmbedService.getPlayerById('youtube-video');
        player.playVideo();
    };

}]);
