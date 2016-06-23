var myApp = angular.module('myApp', ['ngYoutubeEmbed']);

myApp.controller('myCtrl', ['$scope', function($scope) {
    $scope.link = 'https://www.youtube.com/watch?v=9gtYRPKe-VM';

    console.log($scope.link);

    setTimeout(function() {
    	$scope.link = 'https://www.youtube.com/watch?v=if32zXUXC5w';
    	console.log($scope.link);
    }, 5000);
}]);