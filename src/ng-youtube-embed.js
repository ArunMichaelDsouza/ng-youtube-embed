/*
    ng-youtube-embed v0.4.3
    Copyright (c) 2015 Arun Michael Dsouza (amdsouza92@gmail.com)
    Licence: MIT
    Demo on CodePen - http://codepen.io/amdsouza92/pen/yNxyJV
*/

(function() {
    'use strict';

    // ng-youtube-embed main module
    var ngYoutubeEmbed = angular.module('ngYoutubeEmbed', []);

    // Module globals
    var VIDEO_IDS = [],
        YOUTUBE_IFRAME_EMBED_API = 'https://www.youtube.com/iframe_api',
        YOUTUBE_VIDEO_ID_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        YOUTUBE_URL_REGEX = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

    // Function to load youtube iframe embed api
    function loadYoutubeIframeEmbedApi() {
        var iframeEmbedScript = document.createElement('script'),
            firstScript = document.getElementsByTagName('script')[0];

        iframeEmbedScript.src = YOUTUBE_IFRAME_EMBED_API;
        firstScript.parentNode.insertBefore(iframeEmbedScript, firstScript);
    }

    // Function to check whether youtube iframe embed api has been loaded or not
    function youtubeIframeEmbedApiLoaded() {
        var url = YOUTUBE_IFRAME_EMBED_API,
            scripts = document.getElementsByTagName('script');

        for (var i = scripts.length; i--;) {
            if (scripts[i].src == url) return true;
        }

        return false;
    }



    // ng-youtube-embed events + utils service
    ngYoutubeEmbed.service('ngYoutubeEmbedService', ['$window', '$rootScope', function ($window, $rootScope) {

        // Function to set ready state when youtube iframe embed api has been loaded
        this.setReadyState = function() {
            $window.onYouTubeIframeAPIReady = function() {
                console.log(VIDEO_IDS);
                
                VIDEO_IDS.forEach(function(id) {

                    // Emit youtube iframe embed api load event
                    $rootScope.$emit('youtubeIframeEmbedApiLoaded', id);
                });
             };
        };

        var videoPlayers = [];

        // New video player addition event listener
        $rootScope.$on('addNewPlayer', function (event, args) {
            videoPlayers[args.id] = args.player;
        });

        // Function to return iframe player instance based on video id
        this.getPlayerById = function(id) {
            return videoPlayers[id];
        };

        // Function to get youtube video id by url
        this.getVideoIdByUrl = function(url) {

            // Reset youtube video id regex when gaming.youtube url is found
            if (url.includes('gaming')) {
                YOUTUBE_VIDEO_ID_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:gaming.youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            }

            var match = url.match(YOUTUBE_URL_REGEX),
                id = url.match(YOUTUBE_VIDEO_ID_REGEX);

            return id != null ? id[1] : url;
        };
    }]);



    // ng-youtube-embed directive
    ngYoutubeEmbed.directive('ngYoutubeEmbed', ['$sce', 'ngYoutubeEmbedService', '$rootScope', function($sce, ngYoutubeEmbedService, $rootScope) {
        return {
            restrict: 'E',
            template: '<div ng-bind-html="youtubeEmbedFrame"></div>',
            scope: {
                url: '=',
                onready: '=',
                onstatechange: '=',
                autoplay: '@',
                autohide: '@',
                ccloadpolicy: '@',
                color: '@',
                controls: '@',
                disablekb: '@',
                end: '@end',
                fs: '@',
                hl: '@',
                ivloadpolicy: '@',
                playlist: '@',
                playsinline: '@',
                rel: '@',
                showinfo: '@',
                start: '@',
                theme: '@',
                width: '@',
                height: '@',
                enablejsapi: '@',
                vid: '@vid'
            },
            link: function(scope, elem, attr) {

                // Remove id attribute from directive wrapper element - this is done for enabling easy dom manipulation and youtube iframe embed api usage without any interference
                elem[0].removeAttribute('id');

                // Generate iframe options object
                var options = {
                    autoplay: scope.autoplay == 'true' ? 1 : 0,
                    autohide: scope.autohide == 'true' ? 1 : 0,
                    ccloadpolicy: scope.ccloadpolicy == 'true' ? 1 : 0,
                    color: scope.color == 'white' ? 'white' : 'red',
                    controls: scope.controls == 'false' ? 0 : 1,
                    disablekb: scope.disablekb == 'false' ? 0 : 1,
                    end: scope.end ? scope.end : '',
                    fs: scope.fs == 'false' ? 0 : 1,
                    hl: scope.hl ? scope.hl : '',
                    IvLoadPolicy: scope.ivloadpolicy == 'false' ? 0 : 1,
                    playlist: scope.playlistArray ? scope.playlistArray : '',
                    playsinline: scope.playsinline == 'true' ? 1 : 0,
                    rel: scope.rel == 'false' ? 0 : 1,
                    ShowInfo: scope.showinfo == 'false' ? 0 : 1,
                    start: scope.start ? scope.start : '',
                    theme: scope.theme ? scope.theme : '',
                    enablejsapi: scope.enablejsapi === 'true' ? 1 : 0
                };

                console.log(options);

                // Load youtube iframe embed api only if the option is present and it has not been loaded already
                if(options.enablejsapi && !youtubeIframeEmbedApiLoaded()) {
                    loadYoutubeIframeEmbedApi();
                    ngYoutubeEmbedService.setReadyState();
                }

                // Listen to youtubeIframeEmbedApiLoaded event and use youtube iframe embed api to create video player
                if(options.enablejsapi) {
                    $rootScope.$on('youtubeIframeEmbedApiLoaded', function (event, videoId) {
                        if(videoId === scope.vid) {
                            var player = new YT.Player(videoId, {
                                events: {
                                    'onReady': scope.onready,
                                    'onStateChange': scope.onstatechange
                                }
                            });

                            // Emit addNewPlayer event once video player has been craeted
                            $rootScope.$emit('addNewPlayer', {
                                player: player,
                                id: videoId
                            });
                        }
                    });
                }

                if (scope.url != undefined) {

                    // Detecting playlist and fetching video ids
                    scope.playlistArray = [];
                    if (scope.playlist != undefined) {
                        var playlistArray = scope.playlist.split(',');
                        for (var i = 0; i < playlistArray.length; i++) {
                            scope.playlistArray.push(ngYoutubeEmbedService.getVideoIdByUrl(playlistArray[i])); // Scope variable to store playlist ids
                        }
                    }

                    // Declaring parameters for iframe
                    var autoplay, autohide, ccloadpolicy, color, controls, disablekb, end, fs, hl, ivloadpolicy, playlist, playsinline, rel, showinfo, start, theme, width, height, gaming, enablejsapi;

                    // Parameter flags to enable/disable youtube parameters
                    scope.autoplay == 'true' ? autoplay = 1 : autoplay = 0; // Autoplay parameter
                    scope.autohide == 'true' ? autohide = 1 : autohide = 0; // Autohide parameter
                    scope.ccloadpolicy == 'true' ? ccloadpolicy = 1 : ccloadpolicy = 0; // CCLoadPolicy parameter
                    scope.color == 'white' ? color = 'white' : color = 'red'; // Color parameter
                    scope.controls == 'false' ? controls = 0 : controls = 1; // Controls parameter
                    scope.disablekb == 'false' ? disablekb = 0 : disablekb = 1; // DisableKb parameter
                    end = scope.end ? scope.end : ''; // End parameter
                    scope.fs == 'false' ? fs = 0 : fs = 1; // Fullscreen parameter
                    hl = scope.hl ? scope.hl : ''; // Inteface language parameter
                    scope.ivloadpolicy == 'false' ? ivloadpolicy = 0 : ivloadpolicy = 1; // IvLoadPolicy parameter
                    playlist = scope.playlistArray; // Playlist parameter
                    scope.playsinline == 'true' ? playsinline = 1 : playsinline = 0; // Playsinline parameter
                    scope.rel == 'false' ? rel = 0 : rel = 1; // Rel parameter
                    scope.showinfo == 'false' ? showinfo = 0 : showinfo = 1; // ShowInfo parameter
                    start = scope.start ? scope.start : ''; // Start parameter
                    theme = scope.theme ? scope.theme : ''; // Theme parameter
                    gaming = scope.gaming ? scope.gaming : ''; // Gaming parameter
                    enablejsapi = scope.enablejsapi === 'true' ? 1 : 0;

                    var vid = scope.vid;

                    vid && enablejsapi ? VIDEO_IDS.push(vid) : null;

                    // console.log(enablejsapi);
                    // console.log(vid);

                    // Please use this link to view all available youtube player parameters - https://developers.google.com/youtube/player_parameters

                    // Setting default width and height if not provided
                    scope.width != undefined ? width = scope.width : width = '500px';
                    scope.height != undefined ? height = scope.height : height = '350px';

                    // Update iframe when url attribute changes
                    scope.$watch('url', function(newVal) {
                        if (newVal) {

                            // Saving id for youtube video link
                            var ytId = ngYoutubeEmbedService.getVideoIdByUrl(newVal),
                                iframe;

                            // Creating iframe for video playback
                            if (!gaming) {
                                iframe = '<iframe id=' + vid + ' width=' + width + ' height=' + height + ' src="https://www.youtube.com/embed/' + ytId + '?enablejsapi=' + enablejsapi + '&autoplay=' + autoplay + '&autohide=' + autohide + '&cc_load_policy=' + ccloadpolicy + '&color=' + color + '&controls=' + controls + '&disablekb=' + disablekb + '&end=' + end + '&fs=' + fs + '&hl=' + hl + '&playlist=' + playlist + '&playsinline=' + playsinline + '&rel=' + rel + '&showinfo=' + showinfo + '&start=' + start + '&theme=' + theme + '" frameborder="0" allowfullscreen></iframe>';
                            } else {
                                iframe = '<iframe width=' + width + ' height=' + height + ' src="https://gaming.youtube.com/embed/' + ytId + '?autoplay=' + autoplay + '&autohide=' + autohide + '&cc_load_policy=' + ccloadpolicy + '&color=' + color + '&controls=' + controls + '&disablekb=' + disablekb + '&end=' + end + '&fs=' + fs + '&hl=' + hl + '&playlist=' + playlist + '&playsinline=' + playsinline + '&rel=' + rel + '&showinfo=' + showinfo + '&start=' + start + '&theme=' + theme + '" frameborder="0" allowfullscreen></iframe>';
                            }
                            // Sanitizing and rendering iframe
                            scope.youtubeEmbedFrame = $sce.trustAsHtml(iframe);
                        }
                    });
                } else {
                    console.warn('');
                }
            }
        }
    }]);
})();
