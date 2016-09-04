var myApp = angular.module('myApp', ['ngYoutubeEmbed']);

myApp.controller('myCtrl', ['$scope', function($scope) {
	$scope.videoForm = {};
    $scope.link1 = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';
    $scope.link2 = 'https://www.youtube.com/watch?v=E813VYySueM';
    $scope.link3 = 'https://www.youtube.com/watch?v=vWzeQtiwk9g';
    $scope.link4 = 'https://gaming.youtube.com/watch?v=kNcFa3Xuk5U';
    $scope.link5 = 'https://gaming.youtube.com/watch?v=bstDrow5goo';
}]);