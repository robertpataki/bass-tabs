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

    function Menu(app, el) {

      var _this = this;
      _this.app = app;

      // Global app elements
      _this.els = {};
      _this.els.$window = $(window);
      _this.els.$html = $('html');
      _this.els._$parent = el;
      _this.els.$menuButton = _this.els._$parent.find('.burger_button');
      _this.els.$menu = _this.els._$parent.find('.nav-main');
      _this.els.$menuOverlay = $('.menu_overlay');
      _this.els.$header = $('.container-header')

      // Signals
      _this.signals = {};

/////////////
//////////////// PRIVATE METHODS
///
      function _init() {
        _this.els.$menuButton.on('click', _onMenuButtonClick);

        _this.app.signals.appResized.add(_onWindowResized);
      };

      function _onMenuButtonClick(e) {
        _this.els._$parent.toggleClass('is-open');

        if(_this.els._$parent.hasClass('is-open')) {
          _this.els.$menuOverlay.one('click', _onMenuButtonClick);
          
          TweenMax.to(_this.els.$header, 0.4, {y: 0, ease: Strong.easeInOut});

          TweenMax.to(_this.els.$menuOverlay, 0.3, {opacity: 1, ease: Strong.easeOut, delay: 0.4,
            onStart: function() {
              _this.els.$menuOverlay.css({
                'visibility': 'visible',
                'display': 'block'
              });
              _this.els.$html.css({
                'overflow': 'hidden'
              });
            }
          });
        } else {
          TweenMax.to(_this.els.$header, 0.4, {y: -243, ease: Strong.easeInOut});

          TweenMax.to(_this.els.$menuOverlay, 0.3, {opacity: 0, ease: Strong.easeOut, delay: 0.4, 
            onComplete: function() {
              _this.els.$menuOverlay.css({
                'visibility': 'hidden',
                'display': 'none'
              });
              _this.els.$menuOverlay.css({
                'overflow': 'auto'
              });
              _this.els.$html.css({
                'overflow': 'auto'
              });
            }
          });
        }
      };

      function _onWindowResized() {
        _this.els._$parent.removeClass('is-open');

        var targetY = -243;
        if(window.innerWidth > 720) {
          targetY = 0;
        }

        TweenMax.set(_this.els.$header, {y: targetY});

        _this.els.$menuOverlay.css({
          'visibility': 'hidden',
          'display': 'none',
          'opacity': 0
        });
        _this.els.$html.css({
          'overflow': 'auto'
        });
      }

      // Self initialising
      $(_init());
    }

    return Menu;
  }
);