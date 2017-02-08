var myApp = angular.module('myApp', ['ngYoutubeEmbed']);

myApp.controller('myCtrl', ['$scope', '$window', function($scope, $window) {
    $scope.videoForm = {};
    $scope.link1 = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';
    $scope.link2 = 'https://www.youtube.com/watch?v=E813VYySueM';
    $scope.link3 = 'https://www.youtube.com/watch?v=SCVvhUW7cxo';
    $scope.link4 = 'https://gaming.youtube.com/watch?v=kNcFa3Xuk5U';
    $scope.link5 = 'https://gaming.youtube.com/watch?v=1pxAXJNJ-z8';

    var player, player2;

    $window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-video', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
        player2 = new YT.Player('youtube-video2', {
            events: {
                'onReady': onPlayerReady2
            }
        });
    };

    function onPlayerReady() {
        console.log("hey Im ready");
        console.log(player);
        //do whatever you want here. Like, player.playVideo();

    }

    function onPlayerStateChange() {
        console.log("my state changed");
    }

    function onPlayerReady2() {
        console.log("hey Im ready2");
        console.log(player2);
        //do whatever you want here. Like, player.playVideo();

    }

}]);
