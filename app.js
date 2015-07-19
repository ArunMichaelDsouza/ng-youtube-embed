var test = angular.module('test', ['ngYoutubeEmbed']);
test.controller('testCtrl', ['$scope', function($scope) {
    $scope.link = 'https://www.youtube.com/watch?v=X4pAQlzuNL4';
}]);

var ngYoutubeEmbed = angular.module('ngYoutubeEmbed', [])
    .directive('ngYoutubeEmbed', [function() {
        return {
            restrict: 'E',
            template: '<div ng-bind-html="youtubeEmbedFrame"></div>',
            scope: {
                url: '=',
                autoplay: '@autoplay',
                autohide: '@autohide',
                ccloadpolicy: '@ccloadpolicy',
                color: '@color',
                controls: '@controls',
                disablekb: '@disablekb',
                end: '@end',
                fs: '@fs',
                hl: '@hl',
                ivloadpolicy: '@ivloadpolicy',
                playlist: '@playlist',
                playsinline: '@playsinline',
                rel: '@rel',
                showinfo: '@showinfo',
                start: '@start',
                theme: '@theme'
            },
            controller: ['$scope', '$sce', function($scope, $sce) {
                var link = $scope.url;

                var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                var q = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

                $scope.playlistArray = [];
                if ($scope.playlist != undefined) {
                    var playlistArray = $scope.playlist.split(',');
                    for (var i = 0; i < playlistArray.length; i++) {
                        var match = playlistArray[i].match(q);
                        var id = playlistArray[i].match(p);
                        if (id != null) {
                            var ytId = id[1];
                            $scope.playlistArray.push(ytId);
                        }
                    }
                }

                var autoplay, autohide, ccloadpolicy, color, controls, disablekb, end, fs, hl, ivloadpolicy, playlist, playsinline, rel, showinfo, start, theme;
                $scope.autoplay == 'true' ? autoplay = 1 : autoplay = 0;
                $scope.autohide == 'true' ? autohide = 1 : autohide = 0;
                $scope.ccloadpolicy == 'true' ? ccloadpolicy = 1 : ccloadpolicy = 0;
                $scope.color == 'white' ? color = 'white' : color = 'red';
                $scope.controls == 'false' ? controls = 0 : controls = 1;
                $scope.disablekb == 'true' ? disablekb = 1 : disablekb = 0;
                end = $scope.end;
                $scope.fs == 'false' ? fs = 0 : fs = 1;
                hl = $scope.hl;
                $scope.ivloadpolicy == 'true' ? ivloadpolicy = 1 : ivloadpolicy = 0;
                playlist = $scope.playlistArray;
                $scope.playsinline == 'true' ? playsinline = 1 : playsinline = 0;
                $scope.rel == 'false' ? rel = 0 : rel = 1;
                $scope.showinfo == 'false' ? showinfo = 0 : showinfo = 1;
                start = $scope.start;
                theme = $scope.theme;

                var match = link.match(q);
                var id = link.match(p);
                if (id != null) {
                    var ytId = id[1];
                    var iframe = '<iframe width="500px" height="350px" src="https://www.youtube.com/embed/' + ytId + '?autoplay=' + autoplay + '&autohide=' + autohide + '&cc_load_policy=' + ccloadpolicy + '&color=' + color + '&controls=' + controls + '&disablekb=' + disablekb + '&end=' + end + '&fs=' + fs + '&hl=' + hl + '&playlist=' + playlist + '&playsinline=' + playsinline + '&rel=' + rel + '&showinfo=' + showinfo + '&start=' + start + '&theme=' + theme + '" frameborder="0" allowfullscreen></iframe>';
                    $scope.youtubeEmbedFrame = $sce.trustAsHtml(iframe);
                }
            }]
        }
    }]);
