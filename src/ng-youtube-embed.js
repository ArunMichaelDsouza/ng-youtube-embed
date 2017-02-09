/*
    ng-youtube-embed v0.4.3
    Copyright (c) 2015 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
    Demo on CodePen - http://codepen.io/amdsouza92/pen/yNxyJV
*/

(function() {
    "use strict";

    var ngYoutubeEmbed = angular.module('ngYoutubeEmbed', []);

    function appendJSAPI() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    function isMyScriptLoaded() {
        var url = "https://www.youtube.com/iframe_api";
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            if (scripts[i].src == url) return true;
        }
        return false;
    }

    var videoIds = [];

    ngYoutubeEmbed.service('youtubeEmbedUtils', ['$window', '$rootScope', function ($window, $rootScope) {
        this.setReadyState = function() {
            window.onYouTubeIframeAPIReady = function() {
                console.log(videoIds);
                
                videoIds.forEach(function(id) {
                    $rootScope.$emit('test', { message: id });
                });
             };
        };
    }]);



    ngYoutubeEmbed.directive('ngYoutubeEmbed', ['$sce', 'youtubeEmbedUtils', '$rootScope', function($sce, youtubeEmbedUtils, $rootScope) {
        return {
            restrict: 'E',
            template: '<div ng-bind-html="youtubeEmbedFrame"></div>',
            scope: {
                url: '=',
                onready: '=',
                onstatechange: '=',
                autoplay: '@',
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
                height: '@height',
                gaming: '@gaming',
                enablejsapi: '@enablejsapi',
                vid: '@vid'
            },
            link: function($scope, elem, attr) {

                if(attr.enablejsapi === 'true' && !isMyScriptLoaded()) {
                    appendJSAPI();
                    youtubeEmbedUtils.setReadyState();
                }

                if(attr.enablejsapi === 'true') {
                    $rootScope.$on('test', function (event, args) {

                        if(args.message === $scope.vid) {

                            console.log(args);
                            
                            var id = args.message;


                            var player = new YT.Player(id, {
                                events: {
                                    'onReady': $scope.onready,
                                    'onStateChange': $scope.onstatechange
                                }
                            });
                        }
                    
                    });
                }





                // var player;
                // window.onYouTubeIframeAPIReady = function() {

                //     var id = elem.children()[0].childNodes[0].getAttribute('id');

                //     console.log(id);

                //     player = new YT.Player(id, {

                //     });
                //     //     events: {
                //     //         'onReady': onPlayerReady,
                //     //         'onStateChange': onPlayerStateChange
                //     //     }
                //     // });
                //     // // player2 = new YT.Player('youtube-video2', {
                //     // //     events: {
                //     // //         'onReady': onPlayerReady2
                //     // //     }
                //     // // });
                // };


                // Remove id attribute from directive
                elem[0].removeAttribute('id');

                // Saving the video link 
                var link = $scope.url;

                // Function to fetch id from youtube link
                function fetchId(link) {

                    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                    var q = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

                    if ($scope.gaming === 'true') {
                        p = /^(?:https?:\/\/)?(?:www\.)?(?:gaming.youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                        q = /^.*(\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    }

                    var match = link.match(q);
                    var id = link.match(p);

                    if (id != null) {
                        var ytId = id[1];
                        return ytId;
                    } else {
                        return link;
                    }
                }

                if (link != undefined) {

                    // Detecting playlist and fetching video ids
                    $scope.playlistArray = [];
                    if ($scope.playlist != undefined) {
                        var playlistArray = $scope.playlist.split(',');
                        for (var i = 0; i < playlistArray.length; i++) {
                            $scope.playlistArray.push(fetchId(playlistArray[i])); // Scope variable to store playlist ids
                        }
                    }

                    // Declaring parameters for iframe
                    var autoplay, autohide, ccloadpolicy, color, controls, disablekb, end, fs, hl, ivloadpolicy, playlist, playsinline, rel, showinfo, start, theme, width, height, gaming, enablejsapi;

                    // Parameter flags to enable/disable youtube parameters
                    $scope.autoplay == 'true' ? autoplay = 1 : autoplay = 0; // Autoplay parameter
                    $scope.autohide == 'true' ? autohide = 1 : autohide = 0; // Autohide parameter
                    $scope.ccloadpolicy == 'true' ? ccloadpolicy = 1 : ccloadpolicy = 0; // CCLoadPolicy parameter
                    $scope.color == 'white' ? color = 'white' : color = 'red'; // Color parameter
                    $scope.controls == 'false' ? controls = 0 : controls = 1; // Controls parameter
                    $scope.disablekb == 'false' ? disablekb = 0 : disablekb = 1; // DisableKb parameter
                    end = $scope.end ? $scope.end : ''; // End parameter
                    $scope.fs == 'false' ? fs = 0 : fs = 1; // Fullscreen parameter
                    hl = $scope.hl ? $scope.hl : ''; // Inteface language parameter
                    $scope.ivloadpolicy == 'false' ? ivloadpolicy = 0 : ivloadpolicy = 1; // IvLoadPolicy parameter
                    playlist = $scope.playlistArray; // Playlist parameter
                    $scope.playsinline == 'true' ? playsinline = 1 : playsinline = 0; // Playsinline parameter
                    $scope.rel == 'false' ? rel = 0 : rel = 1; // Rel parameter
                    $scope.showinfo == 'false' ? showinfo = 0 : showinfo = 1; // ShowInfo parameter
                    start = $scope.start ? $scope.start : ''; // Start parameter
                    theme = $scope.theme ? $scope.theme : ''; // Theme parameter
                    gaming = $scope.gaming ? $scope.gaming : ''; // Gaming parameter
                    enablejsapi = $scope.enablejsapi === 'true' ? 1 : 0;

                    var vid = $scope.vid;

                    vid && enablejsapi ? videoIds.push(vid) : null;

                    // console.log(enablejsapi);
                    // console.log(vid);

                    // Please use this link to view all available youtube player parameters - https://developers.google.com/youtube/player_parameters

                    // Setting default width and height if not provided
                    $scope.width != undefined ? width = $scope.width : width = '500px';
                    $scope.height != undefined ? height = $scope.height : height = '350px';

                    // Update iframe when url attribute changes
                    $scope.$watch('url', function(newVal) {
                        if (newVal) {

                            // Saving id for youtube video link
                            var ytId = fetchId(newVal),
                                iframe;

                            // Creating iframe for video playback
                            if (!gaming) {
                                iframe = '<iframe id=' + vid + ' width=' + width + ' height=' + height + ' src="https://www.youtube.com/embed/' + ytId + '?enablejsapi=' + enablejsapi + '&autoplay=' + autoplay + '&autohide=' + autohide + '&cc_load_policy=' + ccloadpolicy + '&color=' + color + '&controls=' + controls + '&disablekb=' + disablekb + '&end=' + end + '&fs=' + fs + '&hl=' + hl + '&playlist=' + playlist + '&playsinline=' + playsinline + '&rel=' + rel + '&showinfo=' + showinfo + '&start=' + start + '&theme=' + theme + '" frameborder="0" allowfullscreen></iframe>';
                            } else {
                                iframe = '<iframe width=' + width + ' height=' + height + ' src="https://gaming.youtube.com/embed/' + ytId + '?autoplay=' + autoplay + '&autohide=' + autohide + '&cc_load_policy=' + ccloadpolicy + '&color=' + color + '&controls=' + controls + '&disablekb=' + disablekb + '&end=' + end + '&fs=' + fs + '&hl=' + hl + '&playlist=' + playlist + '&playsinline=' + playsinline + '&rel=' + rel + '&showinfo=' + showinfo + '&start=' + start + '&theme=' + theme + '" frameborder="0" allowfullscreen></iframe>';
                            }
                            // Sanitizing and rendering iframe
                            $scope.youtubeEmbedFrame = $sce.trustAsHtml(iframe);
                        }
                    });
                }
            }
        }
    }]);
})();
