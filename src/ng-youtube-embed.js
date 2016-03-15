/*
    ng-youtube-embed v0.2.3
    Copyright (c) 2015 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
    Demo on CodePen - http://codepen.io/amdsouza92/pen/yNxyJV
*/
"use strict";
angular.module('ngYoutubeEmbed', []).directive('ngYoutubeEmbed', [function() {
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
            theme: '@theme',
            width: '@width',
            height: '@height'
        },
        controller: ['$scope', '$sce', function($scope, $sce) {
            // Saving the video link in directive's scope variable
            var link = $scope.url;

            if (link != undefined) {
                // Function to fetch id from youtube link
                function fetchId(link) {
                    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                    var q = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    var match = link.match(q);
                    var id = link.match(p);
                    if (id != null) {
                        var ytId = id[1];
                        return ytId;
                    }
                }

                // Detecting playlist and fetching video ids
                $scope.playlistArray = [];
                if ($scope.playlist != undefined) {
                    var playlistArray = $scope.playlist.split(',');
                    for (var i = 0; i < playlistArray.length; i++) {
                        $scope.playlistArray.push(fetchId(playlistArray[i])); // Scope variable to store playlist ids
                    }
                }

                // Declaring parameters for iframe
                var autoplay, autohide, ccloadpolicy, color, controls, disablekb, end, fs, hl, ivloadpolicy, playlist, playsinline, rel, showinfo, start, theme, width, height;

                // Parameter flags to enable/disable youtube parameters
                $scope.autoplay == 'true' ? autoplay = 1 : autoplay = 0; // Autoplay parameter
                $scope.autohide == 'true' ? autohide = 1 : autohide = 0; // Autohide parameter
                $scope.ccloadpolicy == 'true' ? ccloadpolicy = 1 : ccloadpolicy = 0; // CCLoadPolicy parameter
                $scope.color == 'white' ? color = 'white' : color = 'red'; // Color parameter
                $scope.controls == 'false' ? controls = 0 : controls = 1; // Controls parameter
                $scope.disablekb == 'false' ? disablekb = 0 : disablekb = 1; // DisableKb parameter
                end = $scope.end; // End parameter
                $scope.fs == 'false' ? fs = 0 : fs = 1; // Fullscreen parameter
                hl = $scope.hl; // Inteface language parameter
                $scope.ivloadpolicy == 'false' ? ivloadpolicy = 0 : ivloadpolicy = 1; // IvLoadPolicy parameter
                playlist = $scope.playlistArray; // Playlist parameter
                $scope.playsinline == 'true' ? playsinline = 1 : playsinline = 0; // Playsinline parameter
                $scope.rel == 'false' ? rel = 0 : rel = 1; // Rel parameter
                $scope.showinfo == 'false' ? showinfo = 0 : showinfo = 1; // ShowInfo parameter
                start = $scope.start; // Start parameter
                theme = $scope.theme; // Theme parameter
                /* Please use this link - https://developers.google.com/youtube/player_parameters 
                to view all available youtube player parameters */
                if($scope.width != undefined) {
                    width = $scope.width;
                }
                else {
                    width = '500px';
                }
                if($scope.height != undefined) {
                    height = $scope.height;
                }
                else {
                    height = '350px';
                }

                // Saving id for youtube video link
                var ytId = fetchId(link);
                // Creating iframe for video playback
                var iframe = '<iframe width='+width+' height='+height+' src="https://www.youtube.com/embed/' + ytId + '?autoplay=' + autoplay + '&autohide=' + autohide + '&cc_load_policy=' + ccloadpolicy + '&color=' + color + '&controls=' + controls + '&disablekb=' + disablekb + '&end=' + end + '&fs=' + fs + '&hl=' + hl + '&playlist=' + playlist + '&playsinline=' + playsinline + '&rel=' + rel + '&showinfo=' + showinfo + '&start=' + start + '&theme=' + theme + '" frameborder="0" allowfullscreen></iframe>';
                // Sanitizing and rendering iframe
                $scope.youtubeEmbedFrame = $sce.trustAsHtml(iframe);
            }
        }]
    }
}]);
