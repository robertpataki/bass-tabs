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
      _this.scriptName = 'disqusScript';

/////////////
//////////////// PRIVATE METHODS
///
      function _init() {
        window.disqus_shortname = _this.shortName;
        window.disqus_identifier = window.location.pathname;
        window.disqus_title = document.title;
        window.disqus_url = window.location.href + '#!newthread';

        _this.disqusScript = document.getElementById(_this.scriptName);

        if(_this.disqusScript === null) {
          _loadScript();
        } else {
          window.DISQUS.reset({
            reload: true,
            config: function () {
              this.page.identifier = window.disqus_identifier;
              this.page.url = window.disqus_url;
            }
          });
        }
      };

      function _loadScript() {
        var tag = document.createElement('script');
        tag.async = true;
        tag.src = _this.script;
        tag.id = _this.scriptName;
        
        (document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0])
        .appendChild(tag);
      };

      // Self initialising
      $(_init());
    }

    return Disqus;
  }
);