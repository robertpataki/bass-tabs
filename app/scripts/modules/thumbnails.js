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

    function Thumbnails(app, el) {

      var _this = this;
      _this.app = app;

      // Global app elements
      _this.els = {};
      _this.els.$window = $(window);
      _this.els.$html = $('html');
      _this.els._$parent = el;

      // Signals
      _this.signals = {};

/////////////
//////////////// PRIVATE METHODS
///
      function _init() {
        _this.app.signals.appResized.add(_resizeThumbnails);
      };

      function _resizeThumbnails() {
        var gridWidth = _this.els._$parent.parent().width();
        var columns = 1;
        var bottomMargin = '8px';

        if(gridWidth >= 640) {
            columns = 4;
            bottomMargin = '0px';
        }
        else if(gridWidth >= 540) {
            columns = 3;
            bottomMargin = '0px';
        }
        else if(gridWidth >= 400) {
            columns = 2;
            bottomMargin = '2px';
        }

        var thumbnailWidth = Math.floor(gridWidth / columns - 0.5);
        if(columns === 1) {
          $('.postlistitem').css({
            'width': thumbnailWidth + 'px',
            'height': (thumbnailWidth * 0.32) + 'px',
            'margin-bottom': bottomMargin
          });
        } else {
          $('.postlistitem').css({
            'width': thumbnailWidth + 'px',
            'height': thumbnailWidth + 'px',
            'margin-bottom': bottomMargin
          });
        }

        if(_this.els._$parent.css('opacity') < 1) {
          _displayThumbnails();
        }
    };

    function _displayThumbnails () {
      TweenMax.to(_this.els._$parent, 0.6, {opacity: 1, ease: Expo.easeOut,
        onStart: function() {
          _this.els._$parent.css({
            'visibility': 'visible'
          })
        }
      });
    };

      // Self initialising
      $(_init());
    }

    return Thumbnails;
  }
);