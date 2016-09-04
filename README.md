# ng-youtube-embed [![npm version](https://badge.fury.io/js/ng-youtube-embed.svg)](https://badge.fury.io/js/ng-youtube-embed) [![NPM Downloads](https://img.shields.io/npm/dm/ng-youtube-embed.svg?style=flat-square)](https://www.npmjs.com/package/ng-youtube-embed) [![Latest Stable Version](https://img.shields.io/bower/v/ng-youtube-embed.svg?style=flat-square)](http://bower.io/search/?q=ng-youtube-embed)

"Just-add-link" AngularJS Module to embed Youtube videos. Forget about those pesky video IDs.
> Superlight (less than 2KB) and easy to use! Support for Youtube player parameters. No 3rd party JS dependencies. 

### [Demo on CodePen](http://codepen.io/amdsouza92/pen/yNxyJV)

<br/>

## Installation

#### CDN 

Use ng-youtube-embed directly from jsdelivr CDN

```html
https://cdn.jsdelivr.net/angular.youtube-embed/0.4.3/ng-youtube-embed.min.js
```

#### via bower

You can install the package using bower. Make sure you have bower installed, then run : 

```html
bower install ng-youtube-embed
```

#### via npm

```html
npm install ng-youtube-embed
```

Or, [download](https://github.com/ArunMichaelDsouza/ng-youtube-embed/releases) the latest version and include ``ng-youtube-embed.min.js`` to your project.

Add ``ngYoutubeEmbed`` as a dependency in your angular app module.

<br/>

## Usage

Include the directive in your HTML file with any of the available youtube player parameters.

Include the ``url`` param and pass in the scope variable which contains the youtube video link which you want to render.

Example - 
```javascript
var myApp = angular.module('myApp', ['ngYoutubeEmbed']);

myApp.controller('myCtrl', ['$scope', function($scope) {
    $scope.link = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';
}]);
```
```html
<ng-youtube-embed 
	url="link" 
    autoplay="true"
    color="white"
    disablekb="true"
    end="20">
</ng-youtube-embed>
```
Where ``link`` is the scope variable containing the youtube video link.

<br/>

## Options

ng-youtube-embed supports most of the youtube player parameters available. For a full list of original parameters check this [link](https://developers.google.com/youtube/player_parameters).

#### Supported parameters

#### ``width {number}``
This parameter specifies the width of the youtube embed frame.
Supported value is a positive integer in ``px`` or ``%``.

#### ``height {number}``
This parameter specifies the height of the youtube embed frame.
Supported value is a positive integer in ``px`` or ``%``.

#### ``autohide {boolean}``
This parameter indicates whether the video controls will automatically hide after a video begins playing. 
Supported values are : ``true`` and ``false``.

#### ``autoplay {boolean}``
This parameter specifies whether the initial video will automatically start to play when the player loads.
Supported values are : ``true`` and ``false``.

#### ``ccloadpolicy {boolean}``
Causes closed captions to be shown by default, even if the user has turned captions off.
Supported values are : ``true`` and ``false``.

#### ``color {string}``
This parameter specifies the color that will be used in the player's video progress bar to highlight the amount of the video that the viewer has already seen. By default, the player uses the color red in the video progress bar.
Supported values are : ``red`` and ``white``.

#### ``controls {boolean}``
This parameter indicates whether the video player controls are displayed.
Supported values are : ``true`` and ``false``.

#### ``disablekb {boolean}``
Setting the parameter's value to ``false`` causes the player to respond to keyboard controls. The default value is ``true``, which means that keyboard controls are disabled. 
Supported values are : ``true`` and ``false``.

#### ``end {number}``
This parameter specifies the time, measured in seconds from the start of the video, when the player should stop playing the video. If you have a playlist, then this parameter will only work for the first video.
Supported value is a positive integer.

#### ``fs {boolean}``
Setting this parameter to ``false`` prevents the fullscreen button from displaying in the player. The default value is ``true``, which causes the fullscreen button to display.
Supported values are : ``true`` and ``false``.

#### ``hl {string}``
Sets the player's interface language. 
The parameter value is an [ISO 639-1 two-letter language code](http://www.loc.gov/standards/iso639-2/php/code_list.php).

#### ``ivloadpolicy {boolean}``
This parameter indicates whether video annotations are to be shown. The default value is ``true``.
Supported values are : ``true`` and ``false``.

#### ``playlist {string}``
This parameter specifies a comma-separated list of video links to play.

#### ``playsinline {boolean}``
This parameter controls whether videos play inline or fullscreen in an HTML5 player on iOS. The default value is ``false``.
Supported values are : ``true`` and ``false``.

#### ``rel {boolean}``
This parameter indicates whether the player should show related videos when playback of the initial video ends. The default value is ``true``.
Supported values are : ``true`` and ``false``.

#### ``showinfo {boolean}``
Setting the parameter's value to ``false`` causes the player to not display information like the video title and uploader before the video starts playing.
Supported values are : ``true`` and ``false``.

#### ``start {number}``
This parameter causes the player to begin playing the video at the given number of seconds from the start of the video. If you have a playlist, then this parameter will only work for the first video.
Supported value is a positive integer.

#### ``theme {string}``
This parameter indicates whether the embedded player will display player controls (like a play button or volume control) within a dark or light control bar. The default value is ``dark``.
Supported values are : ``dark`` and ``light``.

#### ``gaming {boolean}``
This parameter enables embedding of videos from ``https://gaming.youtube.com``.
Supported values are : ``true`` and ``false``.

<br/>

## Contributors

- [Fabián Horacio Veliz](https://github.com/fabianVeliz)
- [Gustavo Salgado](https://github.com/gsalgadotoledo)

<br/>

## License

MIT Licensed

Copyright (c) 2015 Arun Michael Dsouza (amdsouza92@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

