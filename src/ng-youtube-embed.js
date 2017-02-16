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
                video: '=',
                onready: '=',
                onstatechange: '=',
                onplaybackqualitychange: '=',
                onplaybackratechange: '=',
                onerror: '=',
                onapichange: '=',
                autoplay: '@',
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
                videoid: '@'
            },
            link: function(scope, elem, attr) {

                // Remove id attribute from directive wrapper element
                elem[0].removeAttribute('id');

                // Generate iframe options object
                var options = {
                    width: scope.width ? scope.width : 500,
                    height: scope.height ? scope.height: 350,
                    autoplay: scope.autoplay == 'true' ? 1 : 0,
                    ccloadpolicy: scope.ccloadpolicy == 'true' ? 1 : 0,
                    color: scope.color == 'white' ? 'white' : 'red',
                    controls: scope.controls == 'false' ? 0 : 1,
                    disablekb: scope.disablekb == 'false' ? 0 : 1,
                    end: scope.end ? scope.end : '',
                    fs: scope.fs == 'false' ? 0 : 1,
                    hl: scope.hl ? scope.hl : '',
                    ivloadpolicy: scope.ivloadpolicy == 'false' ? 0 : 1,
                    playlist: scope.playlistArray ? scope.playlistArray : '',
                    playsinline: scope.playsinline == 'true' ? 1 : 0,
                    rel: scope.rel == 'false' ? 0 : 1,
                    showinfo: scope.showinfo == 'false' ? 0 : 1,
                    start: scope.start ? scope.start : '',
                    theme: scope.theme ? scope.theme : '',
                    enablejsapi: scope.enablejsapi === 'true' ? 1 : 0,
                    videoid: scope.videoid ? scope.videoid : ''
                };
                // All available youtube iframe embed player parameters - https://developers.google.com/youtube/player_parameters


                // Load youtube iframe embed api only if the option is present and it has not been loaded already
                if(options.enablejsapi && !youtubeIframeEmbedApiLoaded()) {
                    loadYoutubeIframeEmbedApi();
                    ngYoutubeEmbedService.setReadyState();
                }

                // Listen to youtubeIframeEmbedApiLoaded event and use youtube iframe embed api to create video player
                if(options.enablejsapi) {
                    $rootScope.$on('youtubeIframeEmbedApiLoaded', function (event, videoId) {
                        if(videoId === options.videoid) {

                            // Create youtube iframe embed video player instance and attach relevant events
                            var player = new YT.Player(videoId, {
                                events: {
                                    'onReady': scope.onready,
                                    'onStateChange': scope.onstatechange,
                                    'onPlaybackQualityChange': scope.onplaybackqualitychange,
                                    'onPlaybackRateChange': scope.onplaybackratechange,
                                    'onError': scope.onerror,
                                    'onApiChange': scope.onapichange
                                }
                                // All available youtube iframe embed player events - https://developers.google.com/youtube/iframe_api_reference#Events
                            });

                            // Emit addNewPlayer event once video player has been craeted
                            $rootScope.$emit('addNewPlayer', {
                                player: player,
                                id: videoId
                            });
                        }
                    });
                }

                if (scope.video) {

                    // Detecting playlist option and retrieving video ids
                    scope.playlistArray = [];
                    if (options.playlist) {
                        var playlistArray = scope.playlist.split(',');
                        for (var i = 0; i < playlistArray.length; i++) {
                            scope.playlistArray.push(ngYoutubeEmbedService.getVideoIdByUrl(playlistArray[i])); // Scope variable to store playlist ids
                        }
                    }

                    // Detecting enablejsapi option and adding video ids to global list
                    options.videoid && options.enablejsapi ? VIDEO_IDS.push(options.videoid) : null;

                    // Update iframe when url attribute changes
                    scope.$watch('video', function(newVal) {
                        if (newVal) {

                            // Saving id for youtube video link
                            var youtubeVideoId = ngYoutubeEmbedService.getVideoIdByUrl(newVal), iframe;

                            // Creating iframe for video playback
                            iframe = '<iframe id="' + options.videoid + '" width="' + options.width + '" height="' + options.height + '" src="https://www.youtube.com/embed/' + youtubeVideoId + '?enablejsapi=' + options.enablejsapi + '&autoplay=' + options.autoplay + '&cc_load_policy=' + options.ccloadpolicy + '&color=' + options.color + '&controls=' + options.controls + '&disablekb=' + options.disablekb + '&end=' + options.end + '&fs=' + options.fs + '&hl=' + options.hl + '&ivloadpolicy=' + options.ivloadpolicy + '&playlist=' + options.playlist + '&playsinline=' + options.playsinline + '&rel=' + options.rel + '&showinfo=' + options.showinfo + '&start=' + options.start + '&theme=' + options.theme + '" frameborder="0" allowfullscreen></iframe>';
                           
                            // Sanitizing and rendering iframe
                            scope.youtubeEmbedFrame = $sce.trustAsHtml(iframe);
                        }
                    });
                } else {
                    console.warn('Please enter a valid youtube video url or id to render the iframe embed player');
                }
            }
        }
    }]);
})();
