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

        if(gridWidth >= 810) {
            columns = 4;
        }
        else if(gridWidth >= 640) {
            columns = 3;
        }
        else if(gridWidth >= 480) {
            columns = 2;
        }

        var thumbnailWidth = Math.floor(gridWidth / columns - 0.5);
        if(columns === 1) {
          $('.postlistitem').css({
            'width': thumbnailWidth + 'px',
            'height': (thumbnailWidth * 0.32) + 'px',
            'margin-bottom': '12px'
          });
        } else {
          $('.postlistitem').css({
            'width': thumbnailWidth + 'px',
            'height': thumbnailWidth + 'px'
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