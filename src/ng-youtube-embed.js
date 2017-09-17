/*
    ng-youtube-embed v1.7.11
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
        YOUTUBE_VIDEO_ID_REGEX = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        YOUTUBE_VIDEO_ID_REGEX_GAMING = /^(?:https?:\/\/)?(?:www\.)?(?:gaming.youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

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

    // Function to generate iframe embed player template
    function generateEmbedIframeTemplate(options, scope, videoId) {
        var youtubeVideoId = videoId ? videoId : '';

        return '<iframe id="' + options.videoid + '" width="' + options.width + '" height="' + options.height + '" src="https://www.youtube.com/embed/' + youtubeVideoId + '?enablejsapi=' + options.enablejsapi + '&autoplay=' + options.autoplay + '&cc_load_policy=' + options.ccloadpolicy + '&color=' + options.color + '&controls=' + options.controls + '&disablekb=' + options.disablekb + '&end=' + options.end + '&fs=' + options.fs + '&hl=' + options.hl + '&iv_load_policy=' + options.ivloadpolicy + '&playlist=' + scope.playlistArray + '&playsinline=' + options.playsinline + '&rel=' + options.rel + '&showinfo=' + options.showinfo + '&start=' + options.start + '&modestbranding=' + options.modestbranding + '&loop=' + options.loop + '&listType=' + options.listType + '&list=' + options.list + '&origin=' + options.origin + '" frameborder="0" allowfullscreen></iframe>';
    }

    // Function to render iframe embed player template
    function renderIframeEmbedPlayer(options, scope, $sce, youtubeVideoId) {

        // Creating iframe template for video playback
        var iframe = generateEmbedIframeTemplate(options, scope, youtubeVideoId);

        // Sanitizing and rendering iframe
        scope.youtubeEmbedFrame = $sce.trustAsHtml(iframe);
    };



    // ng-youtube-embed events + utils service
    ngYoutubeEmbed.service('ngYoutubeEmbedService', ['$window', '$rootScope', function($window, $rootScope) {

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
        $rootScope.$on('addNewPlayer', function(event, args) {
            videoPlayers[args.id] = args.player;
        });

        // Function to return iframe player instance based on video id
        this.getPlayerById = function(id) {
            return videoPlayers[id];
        };

        // Function to get youtube video id by url
        this.getVideoIdByUrl = function(url) {

            // Reset youtube video id regex when gaming.youtube url is found and vice versa
            var ytVideoRegex = (url.indexOf('gaming') !== -1) ? YOUTUBE_VIDEO_ID_REGEX_GAMING : YOUTUBE_VIDEO_ID_REGEX,
                id = url.match(ytVideoRegex);

            return id !== null ? id[1] : url;
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
                width: '@',
                height: '@',
                enablejsapi: '@',
                videoid: '@',
                modestbranding: '@',
                loop: '@',
                listtype: '@',
                list: '@',
                origin: '@'
            },
            link: function(scope, elem, attr) {

                // Remove id attribute from directive wrapper element
                elem[0].removeAttribute('id');

                // Generate iframe options object
                var options = {
                    width: scope.width ? scope.width : 500,
                    height: scope.height ? scope.height : 350,
                    autoplay: scope.autoplay == 'true' ? 1 : 0,
                    ccloadpolicy: scope.ccloadpolicy == 'true' ? 1 : 0,
                    color: scope.color == 'white' ? 'white' : 'red',
                    controls: scope.controls == 'false' ? 0 : 1,
                    disablekb: scope.disablekb == 'false' ? 1 : 0,
                    end: scope.end ? scope.end : '',
                    fs: scope.fs == 'false' ? 0 : 1,
                    hl: scope.hl ? scope.hl : '',
                    ivloadpolicy: scope.ivloadpolicy == 'false' ? 3 : 1,
                    playlist: scope.playlist ? scope.playlist : '',
                    playsinline: scope.playsinline == 'true' ? 1 : 0,
                    rel: scope.rel == 'false' ? 0 : 1,
                    showinfo: scope.showinfo == 'false' ? 0 : 1,
                    start: scope.start ? scope.start : '',
                    enablejsapi: scope.enablejsapi === 'true' ? 1 : 0,
                    videoid: scope.videoid ? scope.videoid : '',
                    modestbranding: scope.modestbranding === 'true' ? 1 : 0,
                    loop: scope.loop === 'true' ? 1 : '',
                    listType: scope.listtype ? scope.listtype : '',
                    list: scope.list ? scope.list : '',
                    origin: scope.origin ? scope.origin : ''
                };
                // All available youtube iframe embed player parameters - https://developers.google.com/youtube/player_parameters


                // Load youtube iframe embed api only if the option is present and it has not been loaded already
                if (options.enablejsapi && !youtubeIframeEmbedApiLoaded()) {
                    loadYoutubeIframeEmbedApi();
                    ngYoutubeEmbedService.setReadyState();
                }

                // Listen to youtubeIframeEmbedApiLoaded event and use youtube iframe embed api to create video player
                if (options.enablejsapi) {
                    $rootScope.$on('youtubeIframeEmbedApiLoaded', function(event, videoId) {
                        if (videoId === options.videoid) {

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

                // Check for list parameter and log warning if listype is not present
                if (options.list) {
                    if (!options.listType) {
                        console.warn('The list parameter works in conjunction with the listtype parameter, please provide a valid value for the listtype parameter in order to render a list. Read documentation here - https://github.com/ArunMichaelDsouza/ng-youtube-embed#list-string');
                    } else {
                        renderIframeEmbedPlayer(options, scope, $sce);
                    }
                }

                // Check for listtype parameter and log warning if list is not present
                if (options.listType) {
                    if (!options.list) {
                        console.warn('The listtype parameter works in conjunction with the list parameter, please provide a valid value for the list parameter in order to render a list. Read documentation here - https://github.com/ArunMichaelDsouza/ng-youtube-embed#listtype-string');
                    } else {
                        renderIframeEmbedPlayer(options, scope, $sce);
                    }
                }

                // If neither listtype/list and video parameters are present, then log embed player warning
                if ((!options.listType && !options.list) && !scope.video) {
                    console.warn('Please provide a valid youtube video URL or ID to render the iframe embed player. Read documentation here - https://github.com/ArunMichaelDsouza/ng-youtube-embed');
                }

                // Update iframe when video parameter changes
                scope.$watch('video', function(newVal) {
                    if (newVal) {

                        // Saving id for youtube video link
                        var youtubeVideoId = ngYoutubeEmbedService.getVideoIdByUrl(newVal);

                        renderIframeEmbedPlayer(options, scope, $sce, youtubeVideoId);
                    }
                });
            }
        };
    }]);
})();
