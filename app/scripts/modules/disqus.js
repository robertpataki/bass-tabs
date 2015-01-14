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

    function Disqus(app, el) {

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
      _this.shortName = 'os-bass-tabs';
      _this.script = '//' + _this.shortName + '.disqus.com/embed.js';
      _this.isReady = false;

/////////////
//////////////// PRIVATE METHODS
///
      function _init() {
        console.log('[Disqus] - _init(): Disqus is coming!');

        $.getScript(_this.script, _onScriptLoaded);
      };

      function _onScriptLoaded() {
        var tag = document.createElement('script');
        tag.src = _this.script;
        tag.id = 'disqusScript';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        console.log('[Disqus] - _onScriptLoaded(): Disqus is almost here!');
      };

      // Self initialising
      $(_init());
    }

    return Disqus;
  }
);