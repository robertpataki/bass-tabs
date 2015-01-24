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
      _this.els.$results = $(el).parent();

      // Signals
      _this.signals = {};

      // Vars
      _this.cache = _this.els._$parent.clone();
      _this.data = [];

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
        TweenMax.to(_this.els._$parent, 0.4, {opacity: 1, ease: Expo.easeOut,
          onStart: function() {
            _this.els._$parent.css({
              'visibility': 'visible'
            })
          }
        });
      };

      function _hideThumbnails() {
        TweenMax.to(_this.els._$parent, 0.1, {opacity: 0, ease: Expo.easeOut,
          onComplete: function() {
            _this.els._$parent.css({
              'visibility': 'hidden'
            });
            _onThumbnailsHidden();
          }
        });
      };

      function _onThumbnailsHidden() {
        if(typeof _this.data === 'object') {
          _this.els.$results.html('<ul class="posts postlist"></ul>');
          _this.els._$parent = _this.els.$results.find('.posts');

          for(var i = 0; i < _this.data.length; i ++) {
            var str =   '<li class="postlistitem">';
                str +=  '<a href="' + _this.data[i].url + '">';
                str +=  '<div class="postlistitem_img"></div>';
                str +=  '<div class="postlistitem_content">';
                str +=  '<h3>' + _this.data[i].song + '</h3>';
                str +=  '<div>' + _this.data[i].artist + '</div>';
                str +=  '</div>';
                str +=  '<div class="postlistitem_border"></div>';
                str +=   '</a>';
                str +=  '</li>';
            _this.els.$results.find('.posts').append($(str));
          }
        } else if (typeof _this.data === 'string') {
          _this.els.$results.html('<p>' + _this.data + '</p>');
        }
        _resizeThumbnails();
        _displayThumbnails();
      }

      // Self initialising
      $(_init());

      this.reload = function reload(data) {
        _this.data = data;
        _hideThumbnails();
      };
    }

    return Thumbnails;
  }
);