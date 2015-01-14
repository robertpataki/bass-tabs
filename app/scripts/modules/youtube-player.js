define(
  [
    'jquery',
    'signals',
    'tweenmax'
  ],

  function(
    $,
    signals,
    TweenMax
  ) {

    'use strict';

    function YoutubePlayer(app, el) {

      if(typeof el === 'undefined' || typeof el[0] === 'undefined') {
        return;
      }

      var _this = this;
      _this.app = app;

      // Global app elements
      _this.els = {};
      _this.els._$parent = el;
      _this.els.$window = $(window);
      _this.els.$html = $('html');

      // Signals
      _this.signals = {};

      // Vars
      _this.script = '//youtube.com/iframe_api';
      _this.scriptName = 'youtubeScript';
      _this.videoId = _this.els._$parent.attr('data-url').split('?v=')[1];

/////////////
//////////////// PRIVATE METHODS
///
      function _init() {
        _loadScript();
      };

      function _loadScript() {
        var tag = document.createElement('script');
        tag.async = true;
        tag.src = _this.script;
        tag.id = _this.scriptName;
        
        (document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0])
        .appendChild(tag);

        window.onYouTubeIframeAPIReady = function() {
          _loadVideo(_this.videoId);
        };
      };

      function _loadVideo(videoId) {
        if(typeof _this.player !== 'undefined') {
          _this.player.destroy();
        }

        _this.player = new YT.Player(_this.els._$parent[0], {
          width: '854',
          height: '480',
          videoId: videoId,
          playerVars: {
            'showinfo': 0,
            'playsinline': 1,
            'modestbranding': 0,
            'rel': 0,
            'wmode': 'transparent',
            'frameborder': 1,
            'enablejsapi': 1,
            'html5': 1
          },
          events: {
            'onReady': _onPlayerReady,
            'onStateChange': _onPlayerStateChange
          }
        });

        _this.player.addEventListener('onStateChange', _onPlayerStateChange);
      };

      function _onPlayerReady() {
        // console.log('[YoutubePlayer] - _onPlayerReady(): Youtube API is ready!');
      };

      function _onPlayerStateChange(state) {
        // 0 = FINISH
        // 1 = PLAY
        // 2 = PAUSE
        // 3 = SEEK

        // console.log('[YoutubePlayer] - _onPlayerStateChange() - state: ', state.data);
      };

      // Self initialising
      $(_init());
    }

    return YoutubePlayer;
  }
);