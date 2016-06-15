var myApp = angular.module('myApp', ['ngYoutubeEmbed']);

myApp.controller('myCtrl', ['$scope', function($scope) {
    $scope.videoForm = {};
    $scope.link = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';
}]);